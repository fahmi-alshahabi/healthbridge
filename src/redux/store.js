// Importing configureStore from Redux Toolkit to configure the Redux store
import { configureStore } from "@reduxjs/toolkit";
// Importing the loaderSlice to manage the loader state in the store
import { loaderSlice } from "./loaderSlice";

// Configuring the Redux store and combining the reducers
export const store = configureStore({
  reducer: {
    loader: loaderSlice.reducer, // Adding loaderSlice reducer to the store
  },
});
