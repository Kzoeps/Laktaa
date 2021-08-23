import * as Yup from 'yup';
import { VALIDATION_MESSAGES } from '../../../shared/models/constants';

const POST_JOB_SCHEMA = Yup.object().shape({
  loadType: Yup.string().required(VALIDATION_MESSAGES.required),
  perish: Yup.string().required(VALIDATION_MESSAGES.required),
  price: Yup.number().required(VALIDATION_MESSAGES.required),
  weight: Yup.number().required(VALIDATION_MESSAGES.required),
  pickPlace: Yup.string().required(VALIDATION_MESSAGES.required),
  pickDzongkhag: Yup.string().required(VALIDATION_MESSAGES.required),
  pickGewog: Yup.string().required(VALIDATION_MESSAGES.required),
  dropPlace: Yup.string().required(VALIDATION_MESSAGES.required),
  dropDzongkhag: Yup.string().required(VALIDATION_MESSAGES.required),
  dropGewog: Yup.string().required(VALIDATION_MESSAGES.required),
});
export default POST_JOB_SCHEMA;
