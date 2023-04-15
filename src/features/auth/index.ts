import { registerUser } from '@/api/thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  clientName: string;
  clientEmail: string;
  token: string;
  isLoading: boolean;
  error: any;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    clientName: localStorage.getItem('clientName') || '',
    clientEmail: localStorage.getItem('clientEmail') || '',
    token: localStorage.getItem('token') || '',
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.clientName = '';
      state.clientEmail = '';
      state.token = '';
      localStorage.removeItem('clientName');
      localStorage.removeItem('clientEmail');
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{
        clientName: string;
        clientEmail: string;
        token: string;
      }>) => {
        state.isLoading = false;
        state.clientName = action.payload.clientName;
        state.clientEmail = action.payload.clientEmail;
        state.token = action.payload.token;
        localStorage.setItem('clientName', action.payload.clientName);
        localStorage.setItem('clientEmail', action.payload.clientEmail);
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error;
      })
  }
})

export default authSlice.reducer

export const { logout } = authSlice.actions