export const getReference = () => {
  const today = new Date(new Date().toUTCString())
  const tenDaysAgo = new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000)
  const [currYear, currMonth, currDay] = today.toISOString().substring(0, 10).split('-')
  const [prevYear, prevMonth, prevDay] = tenDaysAgo.toISOString().substring(0, 10).split('-')
  const isEOM = Number(currMonth) - Number(prevMonth) > 0
  return isEOM ? `EOM${prevMonth}${prevYear}` : `PR${currMonth}${currYear}`
}

export const getId = (dmsId: number, reynoldsId: number) => {
  return dmsId > 0 ? dmsId : reynoldsId
}

export const cleanName = (name: string) => {
  const nameArr = name.toUpperCase().replace(',', ' ').split(' ')
  return [nameArr[1], nameArr[0]].join(' ')
}
