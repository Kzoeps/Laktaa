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
    const response = await FIREBASE_CALLS.createUserProfile(userDetails);
    return response.data;
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

// export const { setUserDetails } = authSlice.actions;

export default authSlice.reducer;
