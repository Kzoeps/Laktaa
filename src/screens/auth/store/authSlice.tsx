import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../models/models';
import { APIStatuses } from '../../../shared/models/model';

const initialState: AuthState = {
  userDetails: {
    userName: '',
    userId: '',
  },
  status: APIStatuses.IDLE,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
