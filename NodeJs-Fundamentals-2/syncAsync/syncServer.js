const http = require('http');
const fs = require('fs');
http.createServer(function (req, res) {

    var data = fs.readFileSync("./index.html");
    res.end(data);
}).listen(8081);