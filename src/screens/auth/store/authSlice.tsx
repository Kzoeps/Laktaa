import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthStoreActionTypes, UserDetails } from '../models/models';
import { APIStatuses } from '../../../shared/models/model';
import { FIREBASE_CALLS } from '../utils/API';

const initialState: AuthState = {
  userDetails: {
    userName: '',
    userId: '',
    location: '',
  },
  status: APIStatuses.IDLE,
  error: null,
};

export const setUserDetails = createAsyncThunk(
  AuthStoreActionTypes.setUserDetails,
  async (userDetails: UserDetails) => {
    await FIREBASE_CALLS.createUserProfile(userDetails);
    return userDetails;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [setUserDetails.fulfilled as unknown as string]: (
      state: AuthState,
      action: PayloadAction<UserDetails>
    ) => {
      state.userDetails = action.payload;
    },
  },
});

export const selectUserDetails = (state: { auth: AuthState }): UserDetails => {
  return state.auth.userDetails;
};
// export const { setUserDetails } = authSlice.actions;

export default authSlice.reducer;
