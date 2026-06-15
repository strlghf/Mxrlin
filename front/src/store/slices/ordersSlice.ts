import { createSlice } from "@reduxjs/toolkit";

interface OrdersState {
  id: number;
  total: number;
  created_at: string;
}

const initialState: OrdersState[] = [];

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {}
})

export const {} = ordersSlice.actions;
export default ordersSlice.reducer;