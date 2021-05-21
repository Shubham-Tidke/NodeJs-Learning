const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
http.createServer((req, res) => {
    if (req.url == '/') {
        req.url = '/index.html';
    }
    var urlParts = url.parse(req.url);
    fs.readFile(urlParts.pathname.substr(1), (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end();
            return;
        }
        var headers = null;
        var fileExtension = path.extname(urlParts.pathname.substr(1));
        switch (fileExtension) {
            case '.html':
                headers = { 'content-Type': 'text/html' };
                break;
            case '.css':
                headers = { 'content-Type': 'text/css' };
                break;
            case '.jpg':
                headers = { 'content-Type': 'text/jpeg' };
                break;
            case '.js':
                headers = { 'content-Type': 'text/javascript' };
                break;
            default:
                headers = { 'content-Type': 'application/octet-stream' };
        }
        res.writeHead(200, headers);
        res.end(data);
    });
}).listen(8080);