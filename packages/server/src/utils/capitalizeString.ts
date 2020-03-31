/**
 * Prettier is disabled for this file to allow for wraping of implicit return
 * in parenthesis, per Airbnb style guide.
 */
// prettier-ignore
export const capitalizeString = (str: string) => (
  str.substr(0, 1).toUpperCase() + str.substr(1, str.length)
);
