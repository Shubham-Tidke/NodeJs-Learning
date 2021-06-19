// const funct = require('./utils');
// console.log("from app.js!!")
// console.log(funct(1, 2));
const validator = require('validator');
const chalk = require('chalk');
const notes = require('./notes');
console.log(notes());
//console.log(validator.isEmail(notes()));
console.log(validator.isURL("https://google.com"));
console.log(chalk.green.bold(validator.isEmail(notes())));