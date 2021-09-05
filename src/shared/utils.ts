import { IToastProps } from 'native-base';
import { ToastTypes } from './models/model';

export const getToastConfig = (
  title: string,
  status: ToastTypes,
  description?: string
): Partial<IToastProps> => ({
  title,
  status,
  description,
});
