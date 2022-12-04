import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import breedService from "../../services/breed.service";

const initialState = {
  loading: false,
  breeds: [] as any[],
  selectedBreeds: [] as any[],
  imageList: [] as any[],
  error: false,
  rowCount: 1,
};

export const fetchBreeds = createAsyncThunk("breed/fetchBreeds", async () => {
  const res = await breedService.getAll();
  const objectsToArray = [];
  for (const breed in res.data.message) {
    objectsToArray.push({
      breed: breed,
      sub: res.data.message[breed],
    });
  }
  return objectsToArray;
});

export const fetchImages = createAsyncThunk(
  "breed/fetchImages",
  async (breeds: any[]) => {
    const res = await breedService.getImages(breeds);
    return res;
  }
);

const breedSlice = createSlice({
  name: "breed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBreeds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBreeds.fulfilled, (state, action) => {
      state.loading = false;
      state.breeds = action?.payload;
    });
    builder.addCase(fetchBreeds.rejected, (state, action) => {
      state.loading = false;
      state.breeds = [];
      state.error = true;
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.imageList = action?.payload;
    });
  },
});

export default breedSlice.reducer;
