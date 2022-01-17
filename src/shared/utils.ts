import { IToastProps } from 'native-base';
import { getDocumentAsync } from 'expo-document-picker';
import { DocumentResult } from 'expo-document-picker';
import { ImageResult, manipulateAsync, SaveFormat } from 'expo-image-manipulator';
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

export const selectStoreStatus =
  (sliceName: keyof RootState) =>
  (state: RootState): APIStatuses =>
    state[sliceName].status;

export const compressImage = async (imageUri: string): Promise<ImageResult> => manipulateAsync(imageUri, [], { compress: 0.3, format: SaveFormat.PNG })

export const documentPicker = async (allowedAssets = 'image/*'): Promise<DocumentResult> => getDocumentAsync({ type: allowedAssets })
