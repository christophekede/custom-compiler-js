class Lexer {
  constructor(sourceCode) {
    this._sourceCode = sourceCode;
    this._cursor = 0;
    this._tokens = [];
  }

  // Main function to tokenize the input source code
  tokenize() {
    while (this._cursor < this._sourceCode.length) {
      let currentChar = this._getCurrentChar();

      // Skip whitespace (tabs, spaces, newlines)
      if (this._isWhitespace(currentChar)) {
        this._advanceCursor();
        continue;
      }

      // Ignore multi line comments
      if (currentChar === "/" && this._sourceCode[this._cursor + 1] === "*") {
        this._advanceCursor(); // Skip the '*'
        this._advanceCursor(); // Skip the '/'
        while (
          this._sourceCode[this._cursor] !== "*" &&
          this._sourceCode[this._cursor + 1] !== "/" &&
          this._cursor < this._sourceCode.length
        ) {
          this._advanceCursor();
        }
        this._advanceCursor();
        this._advanceCursor();

        continue;
      }

      // Tokenize numbers
      if (this._isDigit(currentChar)) {
        this._tokens.push(this._tokenizeNumber());
        continue;
      }

      // Tokenize identifiers (variables, function names)
      if (this._isIdentifier(currentChar)) {
        this._tokens.push(this._tokenizeIdentifier());
        continue;
      }

      // Tokenize single character operators/punctuation
      switch (currentChar) {
        case "+":
          if (this._isDigit(this._sourceCode[this._cursor + 1])) {
            this._advanceCursor();
            const res = this._tokenizeNumber();
            this._tokens.push(
              this.createToken(res.tokenType, "+" + res.lexeme)
            );
          } else {
            this._tokens.push(this.createToken("PLUS", "+"));
          }
          this._advanceCursor();
          break;
        case "-":
          if (this._isDigit(this._sourceCode[this._cursor + 1])) {
            this._advanceCursor();
            const res = this._tokenizeNumber();
            this._tokens.push(
              this.createToken(res.tokenType, "-" + res.lexeme)
            );
          } else {
            this._tokens.push(this.createToken("MINUS", "-"));
          }
          this._advanceCursor();
          break;
        case "=":
          if (this._sourceCode[this._cursor + 1] === "=") {
            this._tokens.push(this.createToken("EQUAL", "=="));
            this._advanceCursor();
          } else {
            this._tokens.push(this.createToken("ASSIGN", "="));
          }
          this._advanceCursor();
          break;
        case "(":
          this._tokens.push(this.createToken("LPAREN", "("));
          this._advanceCursor();
          break;
        case ")":
          this._tokens.push(this.createToken("RPAREN", ")"));
          this._advanceCursor();
          break;
        case ",":
          this._tokens.push(this.createToken("COMMA", ","));
          this._advanceCursor();
          break;
        case "{":
          this._tokens.push(this.createToken("LCURLYBRACKET", "{"));
          this._advanceCursor();
          break;
        case "}":
          this._tokens.push(this.createToken("RCURLYBRACKET", "}"));
          this._advanceCursor();
          break;
        default:
          // Handle unexpected characters
          console.error(
            `Unexpected Token at position ${this._cursor}: ${currentChar}`
          );
          return;
      }
    }
    return this._tokens;
  }

  // Method to create a token
  createToken(tokenType, lexeme) {
    return { tokenType, lexeme };
  }

  // Advance the cursor by one position
  _advanceCursor() {
    this._cursor++;
  }

  // Get the current character without moving the cursor
  _getCurrentChar() {
    return this._sourceCode[this._cursor];
  }

  // Tokenize a number
  _tokenizeNumber() {
    let numberValue = "";
    while (this._isDigit(this._getCurrentChar())) {
      numberValue += this._getCurrentChar();
      this._advanceCursor();
    }
    return this.createToken("NUMBER", numberValue);
  }

  // Tokenize an identifier (variable names)
  _tokenizeIdentifier() {
    let identifierValue = "";
    while (this._isIdentifier(this._getCurrentChar())) {
      identifierValue += this._getCurrentChar();
      this._advanceCursor();
    }
    switch (identifierValue) {
      case "if":
        return this.createToken("IF", identifierValue);
      case "return":
        return this.createToken("RETURN", identifierValue);
      case "fn":
        return this.createToken("FUNCTION", identifierValue);

      default:
        return this.createToken("IDENTIFIER", identifierValue);
    }
  }

  // Check if the current character is a digit
  _isDigit(char) {
    return /\d/.test(char);
  }

  // Check if the current character is alphanumeric (A-Z, a-z, 0-9)
  _isIdentifier(char) {
    return /[A-Za-z0-9_]/.test(char);
  }

  // Check if the current character is a whitespace character
  _isWhitespace(char) {
    return /\s/.test(char);
  }
}

module.exports = Lexer;
