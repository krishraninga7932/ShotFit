import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  loginStart,
  isLoggedin,
  loginFailure,
  logout,
} from "./components/Redux/authSlice";
import { db } from "./firebase";
import { ref, set } from "firebase/database";

// sign up
const signupUser = (dispatch, email, password, name) => {
  dispatch(loginStart());

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      set(ref(db, "users/" + user.uid), {
        name: (name || email.split("@")[0]).replace(/[^a-zA-Z]/g, ""),
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      dispatch(
        isLoggedin({
          uid: user.uid,
          email: user.email,
          name: (name || email.split("@")[0]).replace(/[^a-zA-Z]/g, ""),
        })
      );
      return userCredential;
    })
    .catch((error) => {
      let errorMessage = error.message;
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please Login";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      }

      dispatch(loginFailure(errorMessage));
      return Promise.reject(new Error(errorMessage));
    });
};

// login
const loginUser = (dispatch, email, password) => {
  dispatch(loginStart());
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      dispatch(
        isLoggedin({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
      return userCredential;
    })
    .catch((error) => {
      let errorMessage = error.message;
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/invalid-credential") {
        errorMessage =
          "Invalid email or password. Please check or sign up first.";
      } else if (error.code === "auth/missing-password") {
        errorMessage = "Password cannot be empty.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      }

      dispatch(loginFailure(errorMessage));
      return Promise.reject(new Error(errorMessage));
    });
};

// signout
const logOut = (dispatch) => {
  return signOut(auth).then(() => {
    dispatch(logout());
    localStorage.removeItem("user");
  });
};

export default { signupUser, loginUser, logOut };
