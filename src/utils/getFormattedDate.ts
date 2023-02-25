export const getFormattedDate = (
  dateString: string,
  yeardifference?: number,
  time?: boolean
) => {
  const date = new Date(dateString)

  const year = yeardifference
    ? date.getFullYear() + yeardifference
    : date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = time ? String(date.getHours()).padStart(2, '0') : '00'
  const minutes = time ? String(date.getMinutes()).padStart(2, '0') : '00'
  const seconds = time ? String(date.getSeconds()).padStart(2, '0') : '00'

  const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

  return formattedDateString
}
