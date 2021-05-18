//Reading input from command prompt
//Method - 1
const prompt = require('prompt-sync')({ sigint: true });
const check = prompt('enter any number ');
console.log(check.length + " bytes")
console.log(check * 4);

//Method - 2
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Name please ', usrname => {
    console.log(`hi ${usrname}`);
    readline.close();
})
console.log(process.argv);
