type AccountData = 'ukgNumber' | 'accountName' | 'reynoldsNumber'
export type AccountMap = Record<AccountData, string>

export type AccountDetails = {
  accountNumber: string | number
  accountName: string
  needsControl: boolean
  separate: boolean
  normal: boolean
}

export type UploadData = {
  reference: string
  account: string
  accountName: string
  amount: number
  control: number
  description: string
}

export type ReportData = {
  amount: number
  employeeName: string
  employeeId: number
  description: string
  details: AccountDetails
}
