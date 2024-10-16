import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './reducers/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});
