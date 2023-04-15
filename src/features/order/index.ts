import { addOrder, deleteOrder, getOrders, updateOrder } from '@/api/thunks';
import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

interface Order {
  id: string,
  bookId: number,
  customerName: string,
  timestamp: number
}

interface OrderState {
  orders: Order[]
  isLoading: boolean
  error: any
}

const orderSlice = createSlice({
  name: 'order',
  initialState: {} as OrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.isLoading = false;
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error
      })
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.error
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<{
        updated: boolean; orderId?: undefined;
      } | {
        updated: boolean; orderId: string;
      }>) => {
        state.isLoading = false;
        for (let i = 0; i < state.orders.length; i++) {
          if (state.orders[i].id === action.payload?.orderId) {
            state.orders.splice(i, 1)
            break;
          }
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.error = action.error
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (
        state,
        action: PayloadAction<{
          deleted: boolean; orderId?: undefined;
        } | {
          deleted: boolean; orderId: string;
        }>) => {
        state.isLoading = false;
        for (let i = 0; i < state.orders.length; i++) {
          if (state.orders[i].id === action.payload?.orderId) {
            state.orders.splice(i, 1)
            break;
          }
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.error
      })
  }
})

export default orderSlice.reducer;
