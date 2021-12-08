/**
 * Adds commas and decimals using locale
 */
export const numLocale = (stringNum: string | number | undefined) => {
  if (stringNum !== undefined) {
    // + operator converts a string to a typescript number
    return (+stringNum)?.toLocaleString()
  }
}
