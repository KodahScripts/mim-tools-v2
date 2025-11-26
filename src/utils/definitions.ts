enum STORE {
  BMWT = 'BMWT',
  WCN = 'WCN',
}

enum UPLOADHEADER {
  REFERENCE = 'Reference #',
  RECEIPT = 'Receipt #',
  ACCOUNT = 'G/L Account',
  AMOUNT = 'Amount',
  CONTROL = 'Control #',
  DESCRIPTION = 'Description',
}

const ACCT: Account = {
  BMWT: {
    vari: '3304',
    fixed: '3225',
    fee: '3331C',
  },
  WCN: {
    vari: '3040',
    fixed: '2250',
    fee: '3324',
  },
}

// const UPLOADHEADER = [
//   'Reference #',
//   'Receipt #',
//   'G/L Account',
//   'Amount',
//   'Control #',
//   'Description',
// ]

const COLUMN = {
  UTA: {
    DATE: 1,
    CHECK_NUMBER: 4,
    TOTAL_AMOUNT: 6,
    MERCHANT: 7,
    RESPONSE: 15,
    CONTROL: 21,
  },
  CREDIT: {
    DAILY: {
      DATE: 4,
      BRAND: 8,
      AMOUNT: 15,
      SURCH: 16,
      DEPT: 17,
      INVOICE: 18,
      STATUS: 7,
    },
    MULTI: {
      DATE: 2,
      BRAND: 4,
      AMOUNT: 3,
      SURCH: 99,
      DEPT: 93,
      INVOICE: 94,
      CHAIN: 13,
    },
  },
}

interface UploadRow {
  reference: string
  receipt: string
  glAccount: string
  amount: number
  control: string
  description: string
}

interface Accounts {
  vari: string
  fixed: string
  fee: string
}

interface Account {
  [store: string]: Accounts
}

interface Merchant {
  code: string
  acct: string | undefined
}

interface Flags {
  delete: boolean
}

interface UTADepositRow {
  uid: string
  date: string
  chk: string
  total: string
  merch: Merchant
  resp: string
  ctrl: string
  flag: Flags
}

interface UploadSheet {
  [name: string]: UTADepositRow[]
}

interface CreditDepositRow {
  uid: string
  date: string
  brand: string
  amount: string
  surch: string
  merch: Merchant
  ctrl: string
  flag: Flags
  resp?: string
  chain?: string
}

export type { Accounts, Account, UTADepositRow, UploadRow, UploadSheet, Merchant }
export { UPLOADHEADER, COLUMN, ACCT, STORE }
