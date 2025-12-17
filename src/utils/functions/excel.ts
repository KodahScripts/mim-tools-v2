export const convertExcelDateNumber = (excelDateValue: number) => {
  const excelEpoch: number = 25569
  const msPerDay: number = 86400 * 1000
  const utcDays: number = excelDateValue - excelEpoch
  const utcMilliseconds: number = utcDays * msPerDay
  const dateArr = new Date(utcMilliseconds).toISOString().split('T')[0]?.split('-')
  return dateArr ? [dateArr[1], dateArr[2], String(dateArr[0]).slice(2)].join('') : []
}

export const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export const cleanAmount = (amount: string): number => {
  return Number(amount.replace(/[$,]/g, ''))
}
