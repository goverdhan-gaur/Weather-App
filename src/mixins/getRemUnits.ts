/**
 * Converts pixels to rems.
 * @param {number} px - The number of pixels to convert.
 * @param [base=16] - The base font size in pixels.
 * @returns {string} The equivalent number of rems with "rem" appended.
 */

export const getRem = (px: number, base = 16): string => {
  return `${px / base}rem`
}
