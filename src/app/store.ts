import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import breedSlice from "../features/breeds/breedSlice";
import imagesSlice from "../features/images/imagesSlice";

export const store = configureStore({
  reducer: {
    breed: breedSlice,
    images: imagesSlice,
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
