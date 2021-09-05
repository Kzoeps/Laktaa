import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  DriverInfo,
  DriverSliceActionTypes,
  VehicleInfo,
  VehicleSlice,
} from '../models/models';
import { APIStatuses } from '../../../shared/models/model';
import { VEHICLE_REGISTER_CALLS } from '../utils/API';

const initialState: VehicleSlice = {
  details: undefined,
  status: APIStatuses.IDLE,
  error: null,
};

export const setVehicleRegistration = createAsyncThunk(
  DriverSliceActionTypes.setVehicleRegistration,
  async ({
    vehicleInfo,
    email,
  }: {
    vehicleInfo: VehicleInfo & DriverInfo;
    email: string;
  }) => {
    await VEHICLE_REGISTER_CALLS.registerVehicle(vehicleInfo, email);
    return vehicleInfo;
  }
);

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {},
});

export default vehicleSlice.reducer;
