export type Account = 'variable' | 'fixed' | 'fee'

export type Accounts = {
  [store: string]: Record<Account, number | string>
}

export type Flags = 'delete' | 'found'

export type Merchant = 'code' | 'account'

export interface DepositRow {
  uid: string
  amount: number
  brand: string
  chain: string
  check_number: string
  control: string
  date: string
  response: string
  surcharge: number
  total: number
  merchant: Record<Merchant, number | string>
  flag: Record<Flags, boolean>
}

export type UTADepositRow = Pick<
  DepositRow,
  'uid' | 'check_number' | 'control' | 'date' | 'flag' | 'merchant' | 'response' | 'total'
>

export type CC_DepositRow = Pick<
  DepositRow,
  | 'uid'
  | 'amount'
  | 'brand'
  | 'chain'
  | 'control'
  | 'date'
  | 'flag'
  | 'merchant'
  | 'response'
  | 'surcharge'
>

export type DepositRows = {
  [name: string]: UTADepositRow[] | CC_DepositRow[]
}

export type UploadRow = {
  reference: string
  receipt: string
  glAccount: string
  amount: number
  control: string
  description: string
}

export type UploadRows = {
  [name: string]: UploadRow[]
}
