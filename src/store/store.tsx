import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../screens/auth/store/authSlice';
import vehicleReducer from '../screens/vehicle-registration/store/driverSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleReducer,
  },
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
