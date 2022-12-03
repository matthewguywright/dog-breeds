import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Breed {
  sub: string;
  name: string;
}

const initialState = {
  loading: false,
  breeds: [] as Breed[],
  selectedBreeds: [] as Breed[],
  images: [],
  error: false,
};

export const fetchBreeds = createAsyncThunk("breed/fetchBreeds", () => {
  return axios.get("https://dog.ceo/api/breeds/list/all").then((res) => {
    const breedArray = [] as Breed[];
    for (const breed in res.data.message) {
      breedArray.push({ sub: res.data.message[breed], name: breed });
    }
    return breedArray;
  });
});

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
