import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  images: [],
};

export const fetchImages = createAsyncThunk(
  "breed/fetchImages",
  (breedList: string[]) => {
    const apiCalls = [];
    breedList.forEach((breed) => {
      apiCalls.push(
        axios
          .get(`https://dog.ceo/api/breed/hound/afghan/images`)
          .then((res) => {
            console.log(res);
          })
      );
    });
  }
);

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.images = [];
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.images = action?.payload as any;
    });
    builder.addCase(fetchImages.rejected, (state, action) => {
      state.images = [];
    });
  },
});

export default imagesSlice.reducer;
