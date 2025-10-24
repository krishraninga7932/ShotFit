import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { ref, get, set, update, remove, push } from "firebase/database";

// fetch
export const fetchDiet = createAsyncThunk(
  "diet/fetchDiet",
  async () => {
    const snapShot = await get(ref(db, "diet"));
    if (snapShot.exists()) {
      const data = snapShot.val();
      return Object.entries(data).map(([id, diet]) => ({
        id,
        ...diet,
      }));
    }
    return [];
  }
);

// add
export const addDiet = createAsyncThunk(
  "diet/addDiet",
  async (diet) => {
    const dietref = ref(db, "diet");
    const newref = push(dietref);
    await set(newref, diet);
    return { id: newref.key, ...diet };
  }
);

// delete
export const deleteDiet = createAsyncThunk(
  "diet/deleteDiet",
  async (id) => {
    const delref = ref(db, `diet/${id}`);
    await remove(delref);
    return id;
  }
);

// update
export const updateDiet = createAsyncThunk(
  "diet/updateDiet",
  async ({ id, updated }) => {
    const updateref = ref(db, `diet/${id}`);
    await update(updateref, updated);
    return { id, ...updated };
  }
);

// slice
const adddietSlice = createSlice({
  name: "diet",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiet.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchDiet.fulfilled, (state, action) => {
        state.status = "Successfull";
        state.list = action.payload;
      })
      .addCase(fetchDiet.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      })
      .addCase(addDiet.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteDiet.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      .addCase(updateDiet.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default adddietSlice.reducer;
