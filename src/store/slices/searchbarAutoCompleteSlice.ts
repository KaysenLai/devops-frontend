import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAutoCompleteOptions } from 'services';
import type { RootState } from '../index';

interface InitialState {
  status: boolean;
  error: null | string | undefined;
  options: string[] | null;
}

const initialState: InitialState = {
  status: false,
  error: null,
  options: null,
};

export const fetchSearchbarAutoComplete = createAsyncThunk(
  'searchbar/fetchAutoComplete',
  async (word: string) => {
    const data = await fetchAutoCompleteOptions(word);
    return data as [];
  },
);

const searchbarSlice = createSlice({
  name: 'searchbar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchSearchbarAutoComplete.pending,
        (state: InitialState) => {
          state.status = true;
        },
      )
      .addCase(
        fetchSearchbarAutoComplete.fulfilled,
        (state: InitialState, action) => {
          state.status = false;
          state.options = action.payload;
        },
      )
      .addCase(
        fetchSearchbarAutoComplete.rejected,
        (state: InitialState, action) => {
          state.status = false;
          state.error = action.error.message;
        },
      );
  },
});

export const getSearchbarAutoCompleteOptions = (state: RootState) => state.searchbar.options;
export const getSearchbarAutoCompleteStatus = (state: RootState) => state.searchbar.status;

export default searchbarSlice.reducer;
