import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiEndpoints } from './endpoints';
import Cookies from 'js-cookie';

const api = new ApiEndpoints("https://simple-books-api.glitch.me")

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: { clientName: string, clientEmail: string }, thunkAPI) => {
    return await api.register(data.clientName, data.clientEmail)
  }
);

export const getBooks = createAsyncThunk(
  'book/getBooks',
  async (data: { type?: "fiction" | "non-fiction", limit?: number }) => {
    return await api.getBooks(data.type, data.limit)
  }
)

export const getBook = createAsyncThunk(
  'book/getBook',
  async (bookId: string) => {
    return await api.getBook(bookId)
  }
)

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async (data: { bookId: number, customerName: string }) => {
    return await api.addOrder(data.bookId, data.customerName);
  }
)

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async () => {
    return await api.getOrders();
  }
)

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (bookId: string) => {
    return await api.deleteOrder(bookId);
  }
)

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async (data: { bookId: string, customerName: string }) => {
    return await api.updateOrder(data.bookId, data.customerName)
  }
)