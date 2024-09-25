const identifierLimitLength = 15;
const isIdentifierIsTooLong = (identifier) => {
  return identifier.length > 15;
};

module.exports = {
  isIdentifierIsTooLong,
};
