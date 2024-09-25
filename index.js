const Lexer = require("./Lexer/Lexer");

const program = `
-135
 const imTooLongIdentifierShouldThrowAnError = 0 */
const x = a - b /* je suis un commentaire  je dois etre ignoré */    
const y = -2536
const _ = 6
const a = 123
const b_ = +34
fn(a,b) { if(a==b) {return (a+b+1356)}}
const = -234
`;

const lexer = new Lexer(program);

console.log(lexer.tokenize());
