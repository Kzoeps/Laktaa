import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthState,
  AuthStoreActionTypes,
  ProfileUpdatePayload,
  UserDetails,
} from '../models/models';
import { APIStatuses } from '../../../shared/models/model';
import { FIREBASE_CALLS } from '../utils/API';

const initialState: AuthState = {
  userDetails: {
    userName: '',
    userId: '',
    location: '',
    email: '',
    profileImageUrl: '',
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

export const updateUserProfile = createAsyncThunk(
  AuthStoreActionTypes.updateUserProfile,
  async (userProfile: UserDetails) => {
    await FIREBASE_CALLS.updateUserProfile(userProfile);
    return userProfile;
  }
);

export const updateUserProfileImage = createAsyncThunk(
  AuthStoreActionTypes.updateUserProfileImage,
  async (payload: ProfileUpdatePayload) => {
    await FIREBASE_CALLS.updateUserProfileImage(payload);
    return payload;
  }
);

export const fetchUserProfile = createAsyncThunk(
  AuthStoreActionTypes.fetchUserProfile,
  async (phoneNumber: string) => {
    const response = await FIREBASE_CALLS.getUserProfile(phoneNumber);
    return response.data();
  }
);

/* eslint-disable no-param-reassign */
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
      state.status = APIStatuses.SUCCEEDED;
    },
    [setUserDetails.pending as unknown as string]: (state: AuthState) => {
      state.status = APIStatuses.LOADING;
    },
    [updateUserProfile.pending as unknown as string]: (state: AuthState) => {
      state.status = APIStatuses.LOADING;
    },
    [updateUserProfile.fulfilled as unknown as string]: (
      state: AuthState,
      action: PayloadAction<UserDetails>
    ) => {
      state.status = APIStatuses.SUCCEEDED;
      state.userDetails = { ...state.userDetails, ...action.payload };
    },
    [fetchUserProfile.pending as unknown as string]: (state: AuthState) => {
      state.status = APIStatuses.LOADING;
    },
    [fetchUserProfile.fulfilled as unknown as string]: (
      state: AuthState,
      action: PayloadAction<UserDetails>
    ) => {
      state.userDetails = action.payload;
      state.status = APIStatuses.SUCCEEDED;
    },
    [updateUserProfileImage.pending as unknown as string]: (
      state: AuthState
    ) => {
      state.status = APIStatuses.LOADING;
    },
    [updateUserProfileImage.fulfilled as unknown as string]: (
      state: AuthState,
      action: PayloadAction<ProfileUpdatePayload>
    ) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
      console.log('data saved', state.userDetails);
      console.log('payload :', action.payload);
      state.status = APIStatuses.SUCCEEDED;
    },
    [updateUserProfileImage.rejected as unknown as string]: (
      state: AuthState
    ) => {
      state.status = APIStatuses.FAILED;
    },
    [updateUserProfile.rejected as unknown as string]: (state: AuthState) => {
      state.status = APIStatuses.FAILED;
    },
  },
});
/* eslint-disable no-param-reassign */

export const selectUserDetails = (state: { auth: AuthState }): UserDetails => {
  return state.auth.userDetails;
};

export const selectStoreStatus = (state: { auth: AuthState }): APIStatuses =>
  state.auth.status;
// export const { setUserDetails } = authSlice.actions;

export default authSlice.reducer;
