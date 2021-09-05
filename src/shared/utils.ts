// eslint-disable-next-line import/named
import { ToastTypes } from './models/model';
import { IToastProps } from 'native-base';

export const getToastConfig = (title: string, status: ToastTypes, description?: string): Partial<IToastProps> => ({
	title,
	status,
	description,
});
