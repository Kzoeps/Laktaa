import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { APIStatuses } from '../../../shared/models/model';
import { DashboardActions } from '../models/enums';
import { FIREBASE_FETCHJOB_CALLS } from '../utils/API';
import { DashboardState } from '../models/models';
import { RootState } from '../../../store/store';
import { PostJobInfo } from '../../postjob/models/models';

const initialState: DashboardState = {
  jobs: [],
  status: APIStatuses.IDLE,
  //   need to make a interface and use that as a type.
};

export const fetchJobs = createAsyncThunk(
  DashboardActions.fetchJobs,
  async () => {
    const response = await FIREBASE_FETCHJOB_CALLS.fetchData();
    console.log(`reponse: ${response}`);
    return response.map((item) => item.data());
  }
);

/* eslint-disable no-param-reassign */
export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchJobs.fulfilled as unknown as string]: (
      state: DashboardState,
      action: PayloadAction<any>
    ) => {
      state.jobs = action.payload;
      state.status = APIStatuses.SUCCEEDED;
    },
    [fetchJobs.pending]: (state: DashboardState) => {
      state.status = APIStatuses.LOADING;
    },
    [fetchJobs.rejected]: (state: DashboardState) => {
      state.status = APIStatuses.FAILED;
    },
  },
});
/* eslint-disable no-param-reassign */
export default dashboardSlice.reducer;

export const selectJobs = (state: RootState): PostJobInfo[] =>
  state.dashboard.jobs;
