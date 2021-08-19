import * as Yup from 'yup';
import { VALIDATION_MESSAGES } from '../../../shared/models/constants';

export const SEARCH_SCHEMA = Yup.object({
  pickUp: Yup.string()
    .oneOf(['designer', 'development', 'product', 'other'], 'Invalid Job Type')
    .required('Required'),
});
