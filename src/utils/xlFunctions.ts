export function convertDate(excelDateValue: number) {
  var utc_days = Math.floor(excelDateValue - 25569)
  var utc_value = utc_days * 86400
  var date_info = new Date(utc_value * 1000)
  const month =
    date_info.getMonth() + 1 > 9 ? date_info.getMonth() + 1 : `0${date_info.getMonth() + 1}`
  const day = date_info.getDate() + 1 > 9 ? date_info.getDate() + 1 : `0${date_info.getDate() + 1}`
  const year = date_info.getFullYear().toString().slice(-2)
  return `${month}${day}${year}`
}
