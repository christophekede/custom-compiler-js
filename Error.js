const identifierLimitLength = 15;
const isIdentifierIsTooLong = (identifier) => {
  return identifier.length > identifierLimitLength;
};

module.exports = {
  isIdentifierIsTooLong,
};
