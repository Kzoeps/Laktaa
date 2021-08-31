export const VALIDATION_MESSAGES: Record<string, string> = {
  required: 'This field is required',
  minLength: 'Password should be at least 8 characters long',
  maxLength: 'Max length exceeded',
};

// export const DZONGKHAG_GEWOG: Record<string, {label: string, value: string}[]>
export const DZONGKHAG_GEWOG: {
  [key: string]: { label: string; value: string }[];
} = {
  dzongkhag: [
    { label: 'Bumthang', value: 'Bumthang' },
    { label: 'Chhukha', value: 'Chhukha' },
    { label: 'Dagana', value: 'Dagana' },
    { label: 'Thimphu', value: 'Thimphu' },
    { label: 'Samdrup Jongkhar', value: 'SamdrupJongkhar' },
  ],
  Bumthang: [
    { label: 'chhokhor', value: 'chhokhor' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],

  Chhukha: [
    { label: 'orong', value: 'orong' },
    { label: 'uzurong', value: 'uzurong' },
  ],
  Dagana: [
    { label: 'kalikhloa', value: 'kalikhloa' },
    { label: 'bumdeling', value: 'bumdeling' },
  ],
  Thimphu: [
    { label: 'chang', value: 'chang' },
    { label: 'mothithang', value: 'mothithang' },
    { label: 'genekha', value: 'genekha' },
  ],
  SamdrupJongkhar: [{ label: 'yongba', value: 'gumdar' }],
};
