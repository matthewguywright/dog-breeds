import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import breedSlice from "../features/breeds/breedSlice";

export const store = configureStore({
  reducer: {
    breed: breedSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
