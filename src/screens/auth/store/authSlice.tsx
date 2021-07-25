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

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserDetails: {
			reducer(state, action: PayloadAction<UserDetails>) {
				state.userDetails = action.payload;
			},
			prepare(userId: string, location: string, userName: string) {
				return {
					payload: {
						userId,
						location,
						userName,
					},
				};
			},
		},
	},
});

// export const { setUserDetails } = authSlice.actions;

export const setUserDetails = createAsyncThunk(
	AuthStoreActionTypes.setUserDetails,
	async (userDetails: UserDetails) => {
		const response = await FIREBASE_CALLS.createUserProfile(userDetails)
		return response.data;
	}
);

export default authSlice.reducer;
