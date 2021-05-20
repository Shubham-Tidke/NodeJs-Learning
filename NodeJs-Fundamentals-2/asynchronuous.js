var fs = require('fs');

fs.readFile('file.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
})
console.log("CPU execution before reading file")