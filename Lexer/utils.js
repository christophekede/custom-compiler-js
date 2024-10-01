function isWhitespace(char) {
  return /\s/.test(char);
}

function isDigit(char) {
  return /\d/.test(char);
}

function isIdentifierStart(char) {
  return /[A-Za-z_]/.test(char);
}

function isIdentifierPart(char) {
  return /[A-Za-z0-9_]/.test(char);
}

function isCommentStart(char, nextChar) {
  return char === "/" && nextChar === "*";
}

function isSignedDigit(char, nextChar) {
  return isDigit(char) || ((char === "+" || char === "-") && isDigit(nextChar));
}
function createToken(tokenType, lexeme) {
  return { tokenType, lexeme };
}

export {
  isWhitespace,
  isDigit,
  isIdentifierStart,
  isIdentifierPart,
  isCommentStart,
  isSignedDigit,
  createToken,
};
