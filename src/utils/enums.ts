export enum STORE {
  BMWT = 'BMWT',
  WCN = 'WCN',
}

export enum MERCHANT_ID {
  VARIABLE = '00',
  HOLD = '01',
  FIXED = '02',
}

export enum MERCHANT_CODE {
  VARIABLE = 'V',
  HOLD = 'H',
  FIXED = 'F',
}

export enum UPLOADHEADER {
  REFERENCE = 'Reference #',
  RECEIPT = 'Receipt #',
  ACCOUNT = 'G/L Account',
  AMOUNT = 'Amount',
  CONTROL = 'Control #',
  DESCRIPTION = 'Description',
}

export enum UTA_COLUMN {
  DATE = 1,
  CHECK_NUMBER = 4,
  TOTAL_AMOUNT = 6,
  MERCHANT = 7,
  RESPONSE = 15,
  CONTROL = 21,
}

export enum CC_COLUMN {
  DATE = 4,
  BRAND = 8,
  AMOUNT = 15,
  SURCH = 16,
  DEPT = 17,
  INVOICE = 18,
  STATUS = 7,
}

export enum CC_MULTI_COLUMN {
  DATE = 2,
  BRAND = 4,
  AMOUNT = 3,
  SURCH = 99,
  DEPT = 93,
  INVOICE = 94,
  CHAIN = 13,
}
