export interface PostJobInfo {
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
  pickDate: Date;
  dropDzongkhag: string;
  dropGewog: string;
  dropPlace: string;
  dropOffPhone: number;
  dropDate: Date;
  remarks: string;
  poster?: string;
  imageUri?: string;
}
