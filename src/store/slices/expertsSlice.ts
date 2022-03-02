import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getExperts, getRecommendedExperts, getExpertById } from 'services';
import IExpertInfo from 'types/IExpertInfo';
import IExpertsQuery from 'types/IExpertsQuery';
import type { RootState } from '../index';
import stateAsyncStatus from '../../types/stateAsyncStatus';

interface IFetchExprtsRes {
  experts: IExpertInfo[],
  totalPages: number,
  curPage: number
}
interface InitialState {
  experts: IExpertInfo[];
  recommendedExperts: IExpertInfo[];
  searchedExperts: IExpertInfo[];
  searchedExpertsTotalPages: number;
  currentExpertDetails: IExpertInfo;
  status: stateAsyncStatus;
  searchExpertsStatus: stateAsyncStatus;
  currentExpertDetailsStatus: stateAsyncStatus;
  error: null | string | undefined;
}

const initCurrentExpertDetails: IExpertInfo = {
  photo: '',
  firstName: '',
  lastName: '',
  jobTitle: '',
  location: '',
  price: 0,
  averageRating: '',
  bookedAmount: '',
  expertID: '',
  topic: '',
  personalIntroduction: '',
};

const initialState: InitialState = {
  experts: [],
  recommendedExperts: [],
  searchedExperts: [],
  searchedExpertsTotalPages: 1,
  currentExpertDetails: initCurrentExpertDetails,
  status: stateAsyncStatus.idle,
  searchExpertsStatus: stateAsyncStatus.idle,
  currentExpertDetailsStatus: stateAsyncStatus.idle,
  error: null,
};

export const fetchRecommendedExperts = createAsyncThunk(
  'experts/fetchRecommendedExperts',
  async () => {
    const response = await getRecommendedExperts();
    return response.data as IExpertInfo[];
  },
);

export const fetchExperts = createAsyncThunk(
  'experts/fetchExperts',
  async (query: IExpertsQuery) => {
    const response = await getExperts(query);
    return response.data as IFetchExprtsRes;
  },
);

export const fetchExpertById = createAsyncThunk(
  'experts/fetchExpertById',
  async (expertId: string) => {
    const data = await getExpertById(expertId);
    return data as IExpertInfo;
  },
);

const expertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchRecommendedExperts.pending,
        (state: InitialState) => {
          state.status = stateAsyncStatus.loading;
        },
      )
      .addCase(
        fetchRecommendedExperts.fulfilled,
        (state: InitialState, action) => {
          state.status = stateAsyncStatus.succeeded;
          state.recommendedExperts = state.recommendedExperts.concat(action.payload);
        },
      )
      .addCase(
        fetchRecommendedExperts.rejected,
        (state: InitialState, action) => {
          state.status = stateAsyncStatus.failed;
          state.error = action.error.message;
        },
      ).addCase(
        fetchExperts.pending,
        (state: InitialState) => {
          state.searchExpertsStatus = stateAsyncStatus.loading;
        },
      )
      .addCase(
        fetchExperts.fulfilled,
        (state: InitialState, action) => {
          state.searchExpertsStatus = stateAsyncStatus.succeeded;
          state.searchedExperts = action.payload.experts;
          state.searchedExpertsTotalPages = action.payload.totalPages;
        },
      )
      .addCase(
        fetchExperts.rejected,
        (state: InitialState, action) => {
          state.searchExpertsStatus = stateAsyncStatus.failed;
          state.error = action.error.message;
        },
      )
      .addCase(
        fetchExpertById.pending,
        (state: InitialState) => {
          state.currentExpertDetailsStatus = stateAsyncStatus.loading;
        },
      )
      .addCase(
        fetchExpertById.fulfilled,
        (state: InitialState, action) => {
          state.currentExpertDetailsStatus = stateAsyncStatus.succeeded;
          state.currentExpertDetails = action.payload;
        },
      )
      .addCase(
        fetchExpertById.rejected,
        (state: InitialState, action) => {
          state.currentExpertDetailsStatus = stateAsyncStatus.failed;
          state.error = action.error.message;
        },
      );
  },
});

export const selectExpertsStatus = (state: RootState) => state.experts.status;
export const selectSearchingStatus = (state: RootState) => state.experts.searchExpertsStatus;
export const selectRecommendedExports = (state: RootState) => state.experts.recommendedExperts;
export const selectTopRecommendedExport = (state: RootState) => state.experts.recommendedExperts[0];
export const selectExports = (state: RootState) => state.experts.searchedExperts;
export const selectTotalPage = (state: RootState) => state.experts.searchedExpertsTotalPages;
export const selectCurrentExpertDetails = (state: RootState) => state.experts.currentExpertDetails;
export const selectCurrentExpertDetailsStatus = (state: RootState) => (
  state.experts.currentExpertDetailsStatus
);

export default expertsSlice.reducer;
