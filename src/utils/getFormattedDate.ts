/**
 * Returns a formatted date string in the format of YYYY-MM-DDTHH:mm:ss.
 * @param dateString - The date string to format.
 * @param monthDifference - (Optional) The number of months to add or subtract from the given date.
 * @param time - (Optional) Whether to include time in the formatted date string.
 * @returns The formatted date string.
 */

export const getFormattedDate = (
  dateString: string,
  monthDifference?: number,
  time?: boolean
) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = monthDifference
    ? String(date.getMonth() + 1 + monthDifference).padStart(2, '0')
    : String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = time ? String(date.getHours()).padStart(2, '0') : '00'
  const minutes = time ? String(date.getMinutes()).padStart(2, '0') : '00'
  const seconds = time ? String(date.getSeconds()).padStart(2, '0') : '00'

  const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

  return formattedDateString
}
