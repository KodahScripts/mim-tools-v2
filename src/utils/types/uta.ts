import type { DepositRow } from './global'

export type UTADepositRow = Pick<
  DepositRow,
  'uid' | 'check_number' | 'control' | 'date' | 'flag' | 'merchant' | 'response' | 'total'
>
export type UTADepositRows = {
  [reference: string]: UTADepositRow[]
}
