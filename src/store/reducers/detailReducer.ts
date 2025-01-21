import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { SearchItemType } from "../../network";
import { AsyncTask, Dictionary } from "../../utils";
import { searchSlicerActions } from "./searchReducer";

type DetailState = SearchItemType & {};

type DetailStateDict = Dictionary<AsyncTask<DetailState>>;

const initialState: DetailStateDict = {};

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchSlicerActions.search_success, (state, action) => {
      try {
        const { payload } = action;
        const { data } = payload;
        const { Search } = data;
        if (Search) {
          Search.forEach((item) => {
            const currentItem = state[item.imdbID] as AsyncTask<DetailState>;
            state[item.imdbID] = {
              ...currentItem,
              result: { ...currentItem?.result, ...item },
            };
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    });
  },
});

export const detailSliceActions = detailSlice.actions;
export const detailSliceReducer = detailSlice.reducer;
