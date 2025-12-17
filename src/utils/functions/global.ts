export const getTodayDate = () => {
  const today = new Date(new Date().toUTCString())
  let [year, month, day] = today.toISOString().substring(0, 10).split('-')
  return { day, month, year }
}
