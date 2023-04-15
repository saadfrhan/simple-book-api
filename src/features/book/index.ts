import { getBook, getBooks } from '@/api/thunks';
import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';

interface Book {
  id: number,
  name: string,
  type: "non-fiction" | "fiction",
  available: boolean,
  author?: string,
  price?: number,
  "current-stock"?: number,
}

interface BookState {
  books: Book[]
  isLoading: boolean
  error: any
}

const bookSlice = createSlice({
  name: 'book',
  initialState: {} as BookState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.isLoading = false;
        state.books = action.payload
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.error = action.error
      })
      .addCase(getBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.isLoading = false;
        for (let i = 0; i < state.books.length; i++) {
          if (state.books[i].id === action.payload.id) {
            state.books[i] = action.payload
            break;
          }
        }
      })
      .addCase(getBook.rejected, (state, action) => {
        state.error = action.error
      })
  }
})

export default bookSlice.reducer