export const VALIDATION_MESSAGES: Record<string, string> = {
  required: 'This field is required',
  minLength: 'Should be at least 8 characters long',
  maxLength: 'Max length exceeded',
  phoneNumber: 'Not a valid phone number',
};

export const DZONGKHAG_GEWOG: {
  [key: string]: { label: string; value: string }[];
} = {
  dzongkhag: [
    { label: 'Bumthang', value: 'Bumthang' },
    { label: 'Chhukha', value: 'Chhukha' },
    { label: 'Dagana', value: 'Dagana' },
    { label: 'Gasa', value: 'Gasa' },
    { label: 'Haa', value: 'Haa' },
    { label: 'Lhuentse', value: 'Lhuentse' },
    { label: 'Mongar', value: 'Mongar' },
    { label: 'Paro', value: 'Paro' },
    { label: 'PemaGatshel', value: 'PemaGatshel' },
    { label: 'Punakha', value: 'Punakha' },
    { label: 'SamdrupJongkhar', value: 'SamdrupJongkhar' },
    { label: 'Samtse', value: 'Samtse' },
    { label: 'Sarpang', value: 'Sarpang' },
    { label: 'Thimphu', value: 'Thimphu' },
    { label: 'Trashigang', value: 'Trashigang' },
    { label: 'TrashiYangtse', value: 'TrashiYangtse' },
    { label: 'Trongsa', value: 'Trongsa' },
    { label: 'Tsirang', value: 'Tsirang' },
    { label: 'WangduePhodrang', value: 'WangduePhodrang' },
    { label: 'Zhemgang', value: 'Zhemgang' },
  ],
  Bumthang: [
    { label: 'Chhoekhor ཆོས་འཁོར་', value: 'Chhoekhor' },
    { label: 'Chhume ཆུ་མིག་', value: 'Chhume' },
    { label: 'Ura ཨུ་ར་', value: 'Ura' },
  ],

  Chhukha: [
    { label: 'Bjachho བྱག་ཕྱོགས་', value: 'Bjachho' },
    { label: 'Bongo སྦོང་སྒོར་', value: 'Bongo' },
    { label: 'Chapcha སྐྱབས་ཆ་', value: 'Chapcha' },
    { label: 'Darla དར་ལ་', value: 'Darla' },
    { label: 'Dungna གདུང་ན་', value: 'Dungna' },
    { label: 'Geling དགེ་གླིང་', value: 'Geling' },
    { label: 'Getana གད་སྟག་ན་', value: 'Getana' },
    { label: 'Lokchina ལོག་ཅི་ན་', value: 'Lokchina' },
    { label: 'Metakha སྨད་བཏབ་ཁ་', value: 'Metakha' },
    {
      label: 'Phuentsholing ཕུན་ཚོགས་གླིང་',
      value: 'Phuentsholing',
    },
    { label: 'Sampheling བསམ་འཕེལ་གླིང་', value: 'Sampheling' },
  ],
  Dagana: [
    { label: 'kalikhloa', value: 'kalikhloa' },
    { label: 'bumdeling', value: 'bumdeling' },
  ],
  Gasa: [
    { label: 'chhokhor', value: 'chhokhor' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],
  Haa: [
    { label: 'chhokhor', value: 'chhokhor' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],
  Lhuentse: [
    { label: 'chhokhor', value: 'chhokhor' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],

  Mongar: [
    { label: 'orong', value: 'orong' },
    { label: 'uzurong', value: 'uzurong' },
  ],
  Paro: [
    { label: 'kalikhloa', value: 'kalikhloa' },
    { label: 'bumdeling', value: 'bumdeling' },
  ],
  PemaGatshel: [
    { label: 'chhokhor', value: 'chhokhor' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],
  Punakha: [
    { label: 'chhokhor', value: 'chhokhor' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],
  SamdrupJongkhar: [
    { label: 'chhokhor', value: 'chhokhor' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],

  Samtse: [
    { label: 'orong', value: 'orong' },
    { label: 'uzurong', value: 'uzurong' },
  ],
  Sarpang: [
    { label: 'kalikhloa', value: 'kalikhloa' },
    { label: 'bumdeling', value: 'bumdeling' },
  ],
  Thimphu: [
    { label: 'chhokhor', value: 'chhokhor' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],
  Trashigang: [
    { label: 'chhokhor', value: 'chhokhor' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],
  TrashiYangtse: [
    { label: 'chhokhor', value: 'chhokhor' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],
  Trongsa: [
    { label: 'orong', value: 'orong' },
    { label: 'uzurong', value: 'uzurong' },
  ],
  Tsirang: [
    { label: 'kalikhloa', value: 'kalikhloa' },
    { label: 'bumdeling', value: 'bumdeling' },
  ],
  WangduePhodrang: [
    { label: 'chhokhor', value: 'chhokhor' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],
  Zhemgang: [
    { label: 'ཆོས་འཁོར་', value: 'ཆོས་འཁོར་' },
    { label: 'ura', value: 'ura' },
    { label: 'chumey', value: 'chumey' },
  ],
};
export const NAVIGATION_HEADER_CONFIG = {
  headerStyle: {
    backgroundColor: '#49C1A4',
  },
  headerTitleStyle: {
    color: '#FAFAFA',
  },
  headerTintColor: '#FAFAFA',
};

export const PHONE_NUMBER_EXPRESSION =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
