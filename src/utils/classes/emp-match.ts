import { NEEDS_DATE_CONTROL, NORMAL_ROWS, ON_BANKING_TAB } from '../constants'
import { EMPCOL } from '../enums'
import { getId, cleanName } from '../functions'
import type { RawExcelData, AccountMap, AccountDetails, ReportData } from '../types'

export class MapReport {
  constructor(private data: RawExcelData) {}

  getAccounts(): AccountMap[] {
    return this.data.map((row) => {
      return {
        ukgNumber: String(row[0]),
        accountName: String(row[1]),
        reynoldsNumber: String(row[2]),
      }
    })
  }

  getAccountDetails(ukgID: string): AccountDetails {
    const accounts = this.getAccounts()
    const account = accounts.filter((acct) => String(acct.ukgNumber).match(ukgID))[0]
    const { ukgNumber, accountName, reynoldsNumber } = account
      ? account
      : { ukgNumber: 'N/A', accountName: 'N/A', reynoldsNumber: 'N/A' }
    return {
      accountNumber: reynoldsNumber,
      accountName: accountName.trim(),
      needsControl: NEEDS_DATE_CONTROL.includes(Number(ukgNumber)),
      separate: ON_BANKING_TAB.includes(Number(ukgNumber)),
      normal: NORMAL_ROWS.includes(Number(ukgNumber)),
    }
  }
}

export class Report {
  constructor(
    private data: RawExcelData,
    private mapping: MapReport,
  ) {}

  getData(): ReportData[] {
    return this.data.map((row) => {
      const details = this.mapping.getAccountDetails(String(row[EMPCOL.ACCOUNT]))
      const employeeId = getId(Number(row[EMPCOL.DMS_ID]), Number(row[EMPCOL.EMPLOYEE_ID]))
      const employeeName = cleanName(String(row[EMPCOL.NAME]))
      const description = employeeName
      return {
        amount: Number(row[EMPCOL.AMOUNT]),
        employeeName,
        employeeId,
        description,
        details,
      }
    })
  }
}
