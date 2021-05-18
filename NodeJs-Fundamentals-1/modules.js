//file system module
//not available at gloabally,need to use 'require()'
const fs = require('fs');
const results = fs.readdirSync(__dirname); //reading current directory
console.log(results);

//Process module
//availble at global,no need to 'require()'
console.log('using process module');
process.exit(0);
console.log('code reach check!');

//Other used node modules are http,child process,buffer and streams
