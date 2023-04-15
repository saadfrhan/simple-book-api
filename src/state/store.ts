import { configureStore } from '@reduxjs/toolkit';

import bookReducer from '../features/book';
import orderReducer from '../features/order';
import authReducer from '../features/auth';

export const store = configureStore({
    reducer: {
        book: bookReducer,
        order: orderReducer,
        auth: authReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;