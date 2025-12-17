import type { Accounts, StoreRange } from '@/utils/types'

export const HEADER = [
  'Reference #',
  'Receipt #',
  'G/L Account',
  'Amount',
  'Control #',
  'Description',
]

export const ACCOUNT: Accounts = {
  BMWT: {
    variable: 3304,
    fixed: 3225,
    fee: '3331C',
    parts: 3220,
    adl: '3220A',
  },
  WCN: {
    variable: 3040,
    fixed: 2250,
    fee: 3324,
    parts: null,
    adl: null,
  },
}

export const RECEIPT_RANGE: StoreRange = {
  BMWT: {
    low: 70000,
    high: 80000,
  },
  WCN: {
    low: 50000,
    high: 60000,
  },
}
