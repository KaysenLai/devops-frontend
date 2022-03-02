import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCommentsByExpertId } from 'services';
import ICommentInfo from 'types/ICommentInfo';
import type { RootState } from '../index';
import stateAsyncStatus from '../../types/stateAsyncStatus';

interface InitialState {
  comments: ICommentInfo[];
  status: stateAsyncStatus;
  error: null | string | undefined;
}

const initialState: InitialState = {
  comments: [],
  status: stateAsyncStatus.idle,
  error: null,
};

export const fetchCommentsByExpertId = createAsyncThunk(
  'comments/fetchCommentsByExpertId',
  async (expertId: string) => {
    const data = await getCommentsByExpertId(expertId);
    return data as ICommentInfo[];
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCommentsByExpertId.pending,
        (state: InitialState) => {
          state.status = stateAsyncStatus.loading;
        },
      )
      .addCase(
        fetchCommentsByExpertId.fulfilled,
        (state: InitialState, action) => {
          state.status = stateAsyncStatus.succeeded;
          state.comments = action.payload;
        },
      )
      .addCase(
        fetchCommentsByExpertId.rejected,
        (state: InitialState, action) => {
          state.status = stateAsyncStatus.failed;
          state.error = action.error.message;
        },
      );
  },
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsStatus = (state: RootState) => state.comments.status;

export default commentsSlice.reducer;
