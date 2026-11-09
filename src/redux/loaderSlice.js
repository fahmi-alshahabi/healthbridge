// Importing createSlice from Redux Toolkit to create the slice
import { createSlice } from "@reduxjs/toolkit";

// Creating the loader slice for managing loading state
export const loaderSlice = createSlice({
  name: "loader", // Slice name
  initialState: {
    loading: false, // Initial state for loading
  },
  reducers: {
    // Reducer to show or hide the loader based on action payload
    ShowLoader: (state, action) => {
      state.loading = action.payload; // Setting loading state to true/false
    },
  },
});

// Exporting the ShowLoader action for dispatching it in the app
export const { ShowLoader } = loaderSlice.actions;
