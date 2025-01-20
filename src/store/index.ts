import { configureStore } from "@reduxjs/toolkit";
import { searchSlicerReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    search: searchSlicerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
