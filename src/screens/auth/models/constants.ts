import * as Yup from 'yup';
import { BHT_PHONE_NUMBER_EXPRESSION, VALIDATION_MESSAGES } from '../../../shared/models/constants';

export const SIGN_UP_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required(VALIDATION_MESSAGES.required)
    .max(30, VALIDATION_MESSAGES.maxLength),
  location: Yup.string().required(VALIDATION_MESSAGES.required),
  email: Yup.string().email().required(VALIDATION_MESSAGES.required),
  password: Yup.string()
    .required(VALIDATION_MESSAGES.required)
    .min(8, VALIDATION_MESSAGES.minLength),
});

export const SIGN_UP_PHONE_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required(VALIDATION_MESSAGES.required)
    .max(30, VALIDATION_MESSAGES.maxLength),
  location: Yup.string().required(VALIDATION_MESSAGES.required),
  phoneNumber: Yup.string()
    .required(VALIDATION_MESSAGES.required)
		.matches(BHT_PHONE_NUMBER_EXPRESSION, VALIDATION_MESSAGES.phoneNumber),
  verificationCode: Yup.string()
    .required(VALIDATION_MESSAGES.required)
    .max(6, 'Verification code is 6 digits long')
    .min(6, 'Verification code is 6 digits long'),
});

export const LOGIN_PHONE_SCHEMA = Yup.object().shape({
  phoneNumber: Yup.string()
    .required(VALIDATION_MESSAGES.required)
		.matches(BHT_PHONE_NUMBER_EXPRESSION, VALIDATION_MESSAGES.phoneNumber),
	verificationCode: Yup.string()
    .required(VALIDATION_MESSAGES.required)
    .max(6, 'Verification code is 6 digits long')
    .min(6, 'Verification code is 6 digits long'),
});

export const SIGN_UP_FORM = {
  phoneNumber: '',
  verificationCode: '',
  name: '',
  location: '',
};
