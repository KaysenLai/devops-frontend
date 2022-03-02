import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import commentsSlice from './slices/commentsSlice';
import expertsSlice from './slices/expertsSlice';
import querySlice from './slices/querySlice';
import searchbarSlice from './slices/searchbarAutoCompleteSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    experts: expertsSlice,
    query: querySlice,
    comments: commentsSlice,
    searchbar: searchbarSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
