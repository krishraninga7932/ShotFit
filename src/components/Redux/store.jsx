import { configureStore } from "@reduxjs/toolkit";
import addPackageReducer from "./addpackageSlice";
import authReducer from "./authSlice";
import addSupplementReducer from "./addsupplementSlice";
import addDietReducer from "./adddietSlice";
import billReducer from "./addBill";

export const store = configureStore({
  reducer: {
    addPackage: addPackageReducer,
    addSupplement: addSupplementReducer,
    addDiet: addDietReducer,
    bill: billReducer,
    auth: authReducer,
  },
});
