import { IToastProps } from 'native-base';
import { APIStatuses, ToastTypes } from './models/model';
import { RootState } from '../store/store';

export const getToastConfig = (
  title: string,
  status: ToastTypes,
  description?: string
): Partial<IToastProps> => ({
  title,
  status,
  description,
});

export const selectStoreStatus = (sliceName: keyof RootState) => (state: RootState): APIStatuses => state[sliceName].status
