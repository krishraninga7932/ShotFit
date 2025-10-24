import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { ref, push, set, get } from "firebase/database";

export const fetchBills = createAsyncThunk("bill/fetchBills", async () => {
  const snapshot = await get(ref(db, "bills"));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([id, bill]) => ({ id, ...bill }));
  }
  return [];
});

export const addBill = createAsyncThunk("bill/addBill", async (bill) => {
  const billRef = ref(db, "bills");
  const newRef = push(billRef);
  await set(newRef, bill);
  return { id: newRef.key, ...bill };
});

const billSlice = createSlice({
  name: "bill",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addBill.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default billSlice.reducer;
