import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncTask, Dictionary } from "../../utils";
import { SearchOptionsType, searchResponseType } from "../../network";
import { generateSearchKey } from "../../utils";

export type SearchItemResponse = {
  data: AsyncTask<searchResponseType>;
  options: SearchOptionsType;
};

export type SearchItemModelDict = Dictionary<SearchItemResponse>;

const initialState = {} as SearchItemModelDict;

export const searchSlicer = createSlice({
  name: "search",
  initialState,
  reducers: {
    search_requested: (state, action: PayloadAction<SearchOptionsType>) => {
      const options = action.payload;
      const key = generateSearchKey(options);
      state[key] = {
        data: {
          error: undefined,
          isInit: true,
          isLoading: true,
          result: undefined,
        },
        options: options,
      };
    },
    search_success: (
      state,
      action: PayloadAction<{
        options: SearchOptionsType;
        data: searchResponseType;
      }>
    ) => {
      const { options, data } = action.payload;
      const key = generateSearchKey(options);
      state[key] = {
        data: {
          error: undefined,
          isInit: false,
          isLoading: false,
          result: data,
        },
        options: options,
      };
    },
    search_failure: (
      state,
      action: PayloadAction<{ options: SearchOptionsType; error: Error }>
    ) => {
      const { options, error } = action.payload;
      const key = generateSearchKey(options);
      state[key] = {
        data: {
          error: error.message,
          isInit: false,
          isLoading: false,
          result: undefined,
        },
        options: options,
      };
    },
  },
});

export const searchSlicerReducer = searchSlicer.reducer;
export const searchSlicerActions = searchSlicer.actions;
