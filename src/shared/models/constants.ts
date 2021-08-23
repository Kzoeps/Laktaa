export const VALIDATION_MESSAGES: Record<string, string> = {
  required: 'This field is required',
  minLength: 'Password should be at least 8 characters long',
  maxLength: 'Max length exceeded',
};

export const DZONGKHAG_GEWOG: {
  dzongkhag: string[];
  bumthang: string[];
  chhukha: string[];
} = {
  dzongkhag: [{ name: 'Bumthang' }, { name: 'Chhukha' }, { name: 'Dagana' }],
  Bumthang: [{ name: 'chhokhor' }, { name: 'ura' }, { name: 'chumey' }],
  Chhukha: [{ name: 'orong' }, { name: 'uzurong' }],
  Dagana: [{ name: 'wadwad' }, { name: 'wadawd' }],
};
