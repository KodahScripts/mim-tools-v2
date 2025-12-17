export type RawExcelData = Array<string | number | boolean>[]
export type ExcelReportData = { [reportName: string]: RawExcelData }

export type Account = 'variable' | 'fixed' | 'fee' | 'parts' | 'adl'
export type Accounts = { [store: string]: Record<Account, string | number | null> }
export type Flags = 'delete' | 'found'
export type Range = {
  low: number
  high: number
}
export type Merchant = 'code' | 'account'

export type DepositRow = {
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
  merchant: Record<Merchant, number | string | null | undefined>
  flag: Record<Flags, boolean>
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
  [reference: string]: UploadRow[]
}
