const identifierLimitLength = 15;
export const isIdentifierIsTooLong = (identifier) => {
  return identifier.length > identifierLimitLength;
};
