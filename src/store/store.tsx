import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../screens/auth/store/authSlice';
// eslint-disable-next-line import/no-cycle
import dashboardReducer from '../screens/dashboard/store/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
  },
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
