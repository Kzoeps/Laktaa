import { IToastProps } from 'native-base';
import { APIStatuses, ToastTypes } from './models/model';
import { RootState } from '../store/store';
import * as DocumentPicker from 'expo-document-picker';
import { DocumentResult } from 'expo-document-picker';

export const getToastConfig = (
  title: string,
  status: ToastTypes,
  description?: string
): Partial<IToastProps> => ({
  title,
  status,
  description,
});

export const selectStoreStatus =
  (sliceName: keyof RootState) =>
  (state: RootState): APIStatuses =>
    state[sliceName].status;

export const documentPicker = async (allowedAssets = 'image/*'): Promise<DocumentResult> => DocumentPicker.getDocumentAsync({ type: allowedAssets })
