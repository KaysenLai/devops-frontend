import { createSlice } from '@reduxjs/toolkit';
import {
  get as storageGet,
  del as storageDelete,
  put as storagePut,
} from 'utils/localStorage';
import { USER } from 'constants/localStorageKeys';
import IUser from 'types/IUser.d';
import type { RootState } from '../index';

// Define a type for the slice state
interface UserState {
  userID: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  avatar: string | null;
  entryDate: Date | null;
}

const storedUser: IUser = JSON.parse(storageGet(USER));

// Define the initial state using that type
const initialState: UserState = {
  userID: storedUser?.userID,
  email: storedUser?.email,
  firstName: storedUser?.firstName,
  lastName: storedUser?.lastName,
  phone: storedUser?.phone,
  address: storedUser?.address,
  avatar: storedUser?.avatar,
  entryDate: storedUser?.entryDate,
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserToLocalStorage: (state: UserState, action) => {
      const user: IUser = action.payload;
      storagePut(USER, user);
      state.userID = user.userID;
      state.email = user.email;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.phone = user.phone;
      state.address = user.address;
      state.avatar = user.avatar;
      state.entryDate = user.entryDate;
    },
    removeUserFromLocalStorage: (state) => {
      // delete user from localstorage
      storageDelete(USER);
      state.userID = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.phone = null;
      state.address = null;
      state.avatar = null;
      state.entryDate = null;
    },
  },
});

export const { addUserToLocalStorage, removeUserFromLocalStorage } = slice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentUserEmail = (state: RootState) => state.user.email;
export const selectCurrentUserID = (state: RootState) => state.user.userID;

export const selectCurrentUserFirstName = (state: RootState) => state.user.firstName;

export default slice.reducer;
