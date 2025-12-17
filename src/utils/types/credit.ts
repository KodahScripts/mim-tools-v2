import type { DepositRow, Range } from './global'

export type CCDepositRow = Pick<
  DepositRow,
  | 'uid'
  | 'date'
  | 'brand'
  | 'amount'
  | 'surcharge'
  | 'total'
  | 'control'
  | 'flag'
  | 'merchant'
  | 'response'
  | 'total'
>

export type CCDepositRows = {
  [reference: string]: CCDepositRow[]
}

export type StoreRange = {
  [storeName: string]: Range
}
