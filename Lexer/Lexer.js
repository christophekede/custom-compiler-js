import {
  isWhitespace,
  createToken,
  isCommentStart,
  isSignedDigit,
  isDigit,
  isIdentifierStart,
  isIdentifierPart,
} from "./utils.js";
import { TOKEN_TYPES, KEYWORDS } from "./tokenTypes.js";
import { isIdentifierIsTooLong } from "../Error.js";

export default class Lexer {
  constructor(sourceCode) {
    this._sourceCode = sourceCode;
    this._cursor = 0;
    this._tokens = [];
  }

  tokenize() {
    while (!this._isEndOfSourceCode()) {
      const currentChar = this._getCurrentChar();

      if (isWhitespace(currentChar)) {
        this._advanceCursor();
      } else if (isCommentStart(currentChar, this._peekNextChar())) {
        this._skipComment();
      } else if (isSignedDigit(currentChar, this._peekNextChar())) {
        this._advanceCursor();
        this._tokens.push(this._tokenizeNumber(currentChar));
      } else if (isDigit(currentChar)) {
        this._tokens.push(this._tokenizeNumber());
      } else if (isIdentifierStart(currentChar)) {
        this._tokens.push(this._tokenizeIdentifier());
      } else {
        this._tokenizeOperatorOrPunctuation();
      }
    }
    return this._tokens;
  }

  _isEndOfSourceCode() {
    return this._cursor >= this._sourceCode.length;
  }

  _advanceCursor(step = 1) {
    this._cursor += step;
  }

  _getCurrentChar() {
    return this._sourceCode[this._cursor];
  }

  _peekNextChar() {
    return this._sourceCode[this._cursor + 1];
  }
  _tokenizeIdentifier() {
    let identifierValue = "";
    while (isIdentifierPart(this._getCurrentChar())) {
      identifierValue += this._getCurrentChar();
      this._advanceCursor();
    }

    if (isIdentifierIsTooLong(identifierValue))
      throw new Error("Too long identifier name " + identifierValue);

    return createToken(
      KEYWORDS[identifierValue] || TOKEN_TYPES.IDENTIFIER,
      identifierValue
    );
  }

  _tokenizeNumber(sign = "") {
    let numberValue = "";
    while (isDigit(this._getCurrentChar())) {
      numberValue += this._getCurrentChar();
      this._advanceCursor();
    }

    return createToken("NUMBER", (sign || "") + numberValue);
  }

  _skipComment() {
    this._advanceCursor(2); // Skip '/*'
    while (this._cursor < this._sourceCode.length) {
      if (this._getCurrentChar() === "*" && this._peekNextChar() === "/") {
        this._advanceCursor(2); // Skip '*/'
        break;
      }
      this._advanceCursor();
    }
  }

  _tokenizeOperatorOrPunctuation() {
    const currentChar = this._getCurrentChar();
    const nextChar = this._peekNextChar();
    const twoCharOperator = currentChar + nextChar;

    if (TOKEN_TYPES[twoCharOperator]) {
      this._tokens.push(
        createToken(TOKEN_TYPES[twoCharOperator], twoCharOperator)
      );
      this._advanceCursor(2);
    } else if (TOKEN_TYPES[currentChar]) {
      this._tokens.push(createToken(TOKEN_TYPES[currentChar], currentChar));
      this._advanceCursor();
    } else {
      throw new Error(
        `Illegal character at position ${this._cursor}: ${currentChar}`
      );
    }
  }
}
