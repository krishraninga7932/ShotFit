import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { ref, get, set, update, remove, push } from "firebase/database";

// fetch
export const fetchPackage = createAsyncThunk(
  "package/fetchPackage",
  async () => {
    const snapShot = await get(ref(db, "package"));
    if (snapShot.exists()) {
      const data = snapShot.val();
      return Object.entries(data).map(([id, pkg]) => ({
        id,
        ...pkg,
      }));
    }
    return [];
  }
);

// add
export const addPackage = createAsyncThunk(
  "package/addPackage",
  async (pkg) => {
    const packageref = ref(db, "package");
    const newref = push(packageref);
    await set(newref, pkg);
    return { id: newref.key, ...pkg };
  }
);

// delete
export const deletePackage = createAsyncThunk(
  "package/deletePackage",
  async (id) => {
    const delref = ref(db, `package/${id}`);
    await remove(delref);
    return id;
  }
);

// update
export const updatePackage = createAsyncThunk(
  "package/updatePackage",
  async ({ id, updated }) => {
    const updateref = ref(db, `package/${id}`);
    await update(updateref, updated);
    return { id, ...updated };
  }
);

// slice
const addpackageSlice = createSlice({
  name: "package",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackage.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchPackage.fulfilled, (state, action) => {
        state.status = "Successfull";
        state.list = action.payload;
      })
      .addCase(fetchPackage.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      })
      .addCase(addPackage.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default addpackageSlice.reducer;
