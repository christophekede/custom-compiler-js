import assert from "node:assert/strict";
import test, { describe, it } from "node:test";

import Lexer from "./../Lexer/Lexer.js";
import { TOKEN_TYPES } from "../Lexer/tokenTypes.js";

describe("Lexer", () => {
  const mockProgram = `
     value = -135
    `;

  const mockTokensExpected = [
    { tokenType: TOKEN_TYPES.IDENTIFIER, lexeme: "value" },
    { tokenType: TOKEN_TYPES.ASSIGN, lexeme: "=" },
    { tokenType: TOKEN_TYPES.NUMBER, lexeme: "-135" },
  ];
  const lexer = new Lexer(mockProgram);
  it("Should lexer cursor === 0", () => {
    assert.strictEqual(lexer._cursor, 0);
  });
  it("Should tokens array length === 0", () => {
    assert.strictEqual(lexer._tokens.length, 0);
  });
  it("Should lexer source code === mockProgram", () => {
    assert.strictEqual(lexer._sourceCode, mockProgram);
  });

  it("Should lexer tokens equal mockTokensExpected", () => {
    assert.deepEqual(lexer.tokenize(), mockTokensExpected);
  });
});
