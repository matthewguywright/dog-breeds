import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import breedService from "../../services/breed.service";

const initialState = {
  loading: false,
  breeds: [] as any[],
  selectedBreeds: [] as any[],
  imageList: [] as any[],
  error: false,
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
  reducers: {
    addSelectedBreed(state, action) {
      state.selectedBreeds.push(action.payload);
    },
    removeSelectedBreed(state, action) {
      state.selectedBreeds = state.selectedBreeds.filter((breed) => {
        return (
          breed.breed !== action.payload.breed &&
          breed.subBreed !== action.payload.subBreed
        );
      });
    },
  },
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

export const { addSelectedBreed, removeSelectedBreed } = breedSlice.actions;

export default breedSlice.reducer;
