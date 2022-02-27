import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import IExpertsQuery from 'types/IExpertsQuery';

const initialState: IExpertsQuery = {
  page: 1,
  online: false,
  offline: false,
  sort: '',
  priceFrom: 0,
  priceTo: 500,
  location: '',
  keyword: '',
};

export const slice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setPage: (
      state,
      { payload: { page } }: PayloadAction<{ page: number }>,
    ) => {
      state.page = page;
    },
    setChattingOnline: (
      state,
      { payload: { checked } }: PayloadAction<{ checked: boolean }>,
    ) => {
      state.online = checked;
    },
    setChattingOffline: (
      state,
      { payload: { checked } }: PayloadAction<{ checked: boolean }>,
    ) => {
      state.offline = checked;
    },
    setSortingMethod: (
      state,
      { payload: { method } }: PayloadAction<{ method: string }>,
    ) => {
      state.sort = method;
    },
    setPriceRange: (
      state,
      { payload: { from, to } }: PayloadAction<{ from: number; to: number }>,
    ) => {
      state.priceFrom = from;
      state.priceTo = to;
    },
    setLocation: (
      state,
      { payload: { newLocation } }: PayloadAction<{ newLocation: string }>,
    ) => {
      state.location = newLocation;
    },
    setKeyword: (
      state,
      { payload: { keyword } }: PayloadAction<{ keyword: string }>,
    ) => {
      state.keyword = keyword;
    },
    resetQuery: () => initialState,
  },
});

export const {
  setPage,
  setChattingOnline,
  setChattingOffline,
  setSortingMethod,
  setPriceRange,
  setLocation,
  setKeyword,
  resetQuery,
} = slice.actions;

export const selectQueryState = (state: RootState) => state.query;

export default slice.reducer;
