import { StringSchema } from 'yup';

export interface PostJobInfo {
  called: string[];
  loadType: string;
  perish: string;
  price: number;
  weight: number;
  height: number;
  length: number;
  breath: number;
  pickPlace: string;
  pickDzongkhag: string;
  pickGewog: string;
  pickUpPhone: number;
  pickUpDate: { nanoseconds: number; seconds: number };
  dropDzongkhag: string;
  dropGewog: string;
  dropPlace: string;
  dropOffPhone: number;
  dropOffDate: { nanoseconds: number; seconds: number };
  remarks: string;
  poster?: string;
  imageUri?: string;
}
