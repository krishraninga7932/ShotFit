import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { ref, get, set, update, remove, push } from "firebase/database";

// fetch
export const fetchSupplement = createAsyncThunk(
  "supplement/fetchSupplement",
  async () => {
    const snapShot = await get(ref(db, "supplement"));
    if (snapShot.exists()) {
      const data = snapShot.val();
      return Object.entries(data).map(([id, sup]) => ({
        id,
        ...sup,
      }));
    }
    return [];
  }
);

// add
export const addSupplement = createAsyncThunk(
  "supplement/addSupplement",
  async (sup) => {
    const supplementref = ref(db, "supplement");
    const newref = push(supplementref);
    await set(newref, sup);
    return { id: newref.key, ...sup };
  }
);

// delete
export const deleteSupplement = createAsyncThunk(
  "supplement/deleteSupplement",
  async (id) => {
    const delref = ref(db, `supplement/${id}`);
    await remove(delref);
    return id;
  }
);

// update
export const updateSupplement = createAsyncThunk(
  "supplement/updateSupplement",
  async ({ id, updated }) => {
    const updateref = ref(db, `supplement/${id}`);
    await update(updateref, updated);
    return { id, ...updated };
  }
);

// slice
const addsupplementSlice = createSlice({
  name: "supplement",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplement.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchSupplement.fulfilled, (state, action) => {
        state.status = "Successfull";
        state.list = action.payload;
      })
      .addCase(fetchSupplement.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      })
      .addCase(addSupplement.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteSupplement.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      .addCase(updateSupplement.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default addsupplementSlice.reducer;
