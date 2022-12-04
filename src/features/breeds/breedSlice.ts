import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import breedService from "../../services/breed.service";

const initialState = {
  loading: false,
  breeds: [] as any[],
  selectedBreeds: [] as any[],
  imageList: [],
  error: false,
};

export const fetchBreeds = createAsyncThunk("breed/fetchBreeds", async () => {
  const res = await breedService.getAll();
  return res.data;
});

export const fetchImages = createAsyncThunk(
  "breed/fetchImages",
  async (breeds: any[]) => {
    const res = await breedService.getImages(breeds);
    return res.data;
  }
);

export const getImageCount = createAsyncThunk(
  "breed/getImageCount",
  async (breed: string, subBreed: string) => {
    const res = await breedService.getImageCount(breed, subBreed);
    return res.data;
  }
);

export const getSubBreeds = createAsyncThunk(
  "breed/getSubBreeds",
  async (breed: string) => {
    const res = await breedService.getSubBreeds(breed);
    return res.data;
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
  },
});

export default breedSlice.reducer;
