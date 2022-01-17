import { Action } from 'expo-image-manipulator';
import * as Yup from 'yup';
import { VALIDATION_MESSAGES } from '../../../shared/models/constants';

export const EDIT_PROFILE_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required(VALIDATION_MESSAGES.required)
    .max(30, VALIDATION_MESSAGES.maxLength),
  location: Yup.string().required(VALIDATION_MESSAGES.required),
  phoneNumber: Yup.number(),
});

export const PROFILE_PICTURE_IMAGE_ACTIONS: Action[] = [
  {
    resize: {
      width: 350,
    },
  },
];
