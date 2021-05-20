const http = require('http');
http.createServer(function (req, res) {
    var today = new Date();
    res.end("request reached to server at- " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());

}).listen(8080);