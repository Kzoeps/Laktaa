import * as Yup from 'yup';
import { VALIDATION_MESSAGES } from '../../../shared/models/constants';

export const SIGN_UP_SCHEMA = Yup.object().shape({
	name: Yup.string().required(VALIDATION_MESSAGES.required).max(30, VALIDATION_MESSAGES.maxLength),
	location: Yup.string().required(VALIDATION_MESSAGES.required),
  email: Yup.string().email().required(VALIDATION_MESSAGES.required),
  password: Yup.string()
    .required(VALIDATION_MESSAGES.required)
    .min(8, VALIDATION_MESSAGES.minLength),
});
