import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState } from 'src/screens/auth/models/models';
import { APIStatuses } from 'src/shared/models/model.tsx.ts';

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
