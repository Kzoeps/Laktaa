import * as Yup from 'yup';
import { BHT_PHONE_NUMBER_EXPRESSION, VALIDATION_MESSAGES } from '../../../shared/models/constants';
import { PHONE_NUMBER_EXPRESSION } from '../../../shared/models/constants';

export const POST_JOB_SCHEMA = Yup.object().shape({
  loadType: Yup.string().required(VALIDATION_MESSAGES.required),
  perish: Yup.string().required(VALIDATION_MESSAGES.required),
  price: Yup.number().required(VALIDATION_MESSAGES.required),
  weight: Yup.number().required(VALIDATION_MESSAGES.required),
  pieces: Yup.number().required(VALIDATION_MESSAGES.required),
  size: Yup.string().required(VALIDATION_MESSAGES.required),
  pickPlace: Yup.string().required(VALIDATION_MESSAGES.required),
  pickDzongkhag: Yup.string().required(VALIDATION_MESSAGES.required),
  pickGewog: Yup.string().required(VALIDATION_MESSAGES.required),
  pickUpPhone: Yup.string()
    .required(VALIDATION_MESSAGES.required)
    .matches(BHT_PHONE_NUMBER_EXPRESSION, VALIDATION_MESSAGES.phoneNumber)
    .min(8, VALIDATION_MESSAGES.minLength)
    .max(10, VALIDATION_MESSAGES.maxLength),
  dropPlace: Yup.string().required(VALIDATION_MESSAGES.required),
  dropDzongkhag: Yup.string().required(VALIDATION_MESSAGES.required),
  dropGewog: Yup.string().required(VALIDATION_MESSAGES.required),
  dropOffPhone: Yup.string()
    .required(VALIDATION_MESSAGES.required)
    .matches(BHT_PHONE_NUMBER_EXPRESSION, VALIDATION_MESSAGES.phoneNumber)
    .min(8, VALIDATION_MESSAGES.minLength)
    .max(10, VALIDATION_MESSAGES.maxLength),
});

export const POST_JOB_INITIALIZER = {
  loadType: '',
  perish: '',
  price: '',
  weight: '',
  pieces: '',
  size: '',
  pickPlace: '',
  pickDzongkhag: 'Bumthang',
  pickGewog: '',
  pickUpPhone: '',
  dropDzongkhag: 'Thimphu',
  dropGewog: '',
  dropPlace: '',
  dropOffPhone: '',
  remarks: '',
};

export const POST_JOB_LOAD_TYPE = [
  { label: 'Food', value: 'Food' },
  { label: 'Cloths', value: 'Cloths' },
  { label: 'Documents', value: 'Documents' },
  { label: 'Furniture', value: 'Furniture' },
  { label: 'Auto Parts', value: 'AutoParts' },
];

export const POST_JOB_PERISH = [
  { label: 'Perishable', value: 'Perishable' },
  { label: 'Non-Perishable', value: 'Non-Perishable' },
];

export const POST_JOB_SIZES = [
  { label: 'Small', value: 'Small' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Large', value: 'Large' },
  { label: 'Extra Large', value: 'Extra Large' },
];
