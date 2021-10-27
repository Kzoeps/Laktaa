import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const getVehicleRegistrationDetails = createAsyncThunk(
  DriverSliceActionTypes.getVehicleRegistration,
  async (phoneNumber: string) => {
    const response = await VEHICLE_REGISTER_CALLS.getVehicleRegistration(
      phoneNumber
    );
    return response.data();
  }
);

export const setVehicleRegistration = createAsyncThunk(
  DriverSliceActionTypes.setVehicleRegistration,
  async ({
    registrationDetails,
    phoneNumber,
  }: {
    registrationDetails: VehicleInfo & DriverInfo;
    phoneNumber: string;
  }) => {
    await VEHICLE_REGISTER_CALLS.registerVehicle(
      registrationDetails,
      phoneNumber
    );
    return registrationDetails;
  }
);

export const updateVehicleRegistration = createAsyncThunk(
  DriverSliceActionTypes.updateVehicleRegistration,
  async ({
    registrationDetails,
    phoneNumber,
  }: {
    registrationDetails: VehicleInfo & DriverInfo;
    phoneNumber: string;
  }) => {
    await VEHICLE_REGISTER_CALLS.updateVehicleRegistration(
      registrationDetails,
      phoneNumber
    );
    return registrationDetails;
  }
);

/* eslint-disable no-param-reassign */
export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {},
  extraReducers: {
    [setVehicleRegistration.fulfilled as unknown as string]: (
      state: VehicleSlice,
      action: PayloadAction<VehicleInfo & DriverInfo>
    ) => {
      state.details = action.payload;
      state.status = APIStatuses.SUCCEEDED;
    },
    [setVehicleRegistration.pending as unknown as string]: (
      state: VehicleSlice
    ) => {
      state.status = APIStatuses.LOADING;
    },
    [setVehicleRegistration.rejected as unknown as string]: (
      state: VehicleSlice
    ) => {
      state.status = APIStatuses.FAILED;
    },
    [updateVehicleRegistration.fulfilled as unknown as string]: (
      state: VehicleSlice,
      action: PayloadAction<VehicleInfo & DriverInfo>
    ) => {
      state.details = action.payload;
      state.status = APIStatuses.SUCCEEDED;
    },
    [updateVehicleRegistration.pending as unknown as string]: (
      state: VehicleSlice
    ) => {
      state.status = APIStatuses.LOADING;
    },
    [updateVehicleRegistration.rejected as unknown as string]: (
      state: VehicleSlice
    ) => {
      state.status = APIStatuses.FAILED;
    },
    [getVehicleRegistrationDetails.fulfilled as unknown as string]: (
      state: VehicleSlice,
      action: PayloadAction<VehicleInfo & DriverInfo>
    ) => {
      state.details = action.payload;
      state.status = APIStatuses.SUCCEEDED;
    },
    [getVehicleRegistrationDetails.pending as unknown as string]: (
      state: VehicleSlice
    ) => {
      state.status = APIStatuses.LOADING;
    },
    [getVehicleRegistrationDetails.rejected as unknown as string]: (
      state: VehicleSlice,
      action: PayloadAction<string>
    ) => {
      state.status = APIStatuses.FAILED;
      state.error = action.payload;
    },
  },
});

export default vehicleSlice.reducer;
