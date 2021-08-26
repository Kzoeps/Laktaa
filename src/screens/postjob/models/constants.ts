import * as Yup from 'yup';
import { VALIDATION_MESSAGES } from '../../../shared/models/constants';

export const POST_JOB_SCHEMA = Yup.object().shape({
  loadType: Yup.string().required(VALIDATION_MESSAGES.required),
  perish: Yup.string().required(VALIDATION_MESSAGES.required),
  price: Yup.number().required(VALIDATION_MESSAGES.required),
  weight: Yup.number().required(VALIDATION_MESSAGES.required),
  height: Yup.number(),
  length: Yup.number(),
  breath: Yup.number(),
  pickPlace: Yup.string().required(VALIDATION_MESSAGES.required),
  pickDzongkhag: Yup.string().required(VALIDATION_MESSAGES.required),
  pickGewog: Yup.string().required(VALIDATION_MESSAGES.required),
  dropPlace: Yup.string().required(VALIDATION_MESSAGES.required),
  dropDzongkhag: Yup.string().required(VALIDATION_MESSAGES.required),
  dropGewog: Yup.string().required(VALIDATION_MESSAGES.required),
});

export const POST_JOB_INITIALIZER = {
  loadType: '',
  perish: '',
  price: '',
  weight: '',
  height: '',
  length: '',
  breath: '',
  pickPlace: '',
  pickDzongkhag: 'Thimphu',
  pickGewog: '',
  dropDzongkhag: 'Bumthang',
  dropGewog: '',
  dropPlace: '',
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
