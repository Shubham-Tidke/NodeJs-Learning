const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');//require for post request as post request can come in parts

var doc = null;
http.createServer((req, res) => {
  /* Respond to a HTTP GET request on the path '/load' and return null if a document is yet to be saved:
   otherwise return JSON in the following format:
    doc = {
        title: 'Document Title',
        body: 'Document Body';
    };
  */
  if (req.method == 'GET') {
    if (req.url == '/') {
      req.url = '/index.html';
    }
    else if (req.method == '/load') {
      if (doc == null) { //document doesnot exist
        res.writeHead(200);
        res.end(null);
      } else {  //if document exist then save it as json
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(doc));
      }
    }
    var urlParts = url.parse(req.url);
    fs.readFile(urlParts.pathname.substr(1), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }
      var headers = null;
      /*- Server index.html and all the files in the 'assets' folder, 
      using the correct mime types and the correct http. error code if the file can't be found */
      var fileExtension = path.extname(urlParts.pathname.substr(1));//returns extension of file
      switch (fileExtension) {
        case '.html':
          headers = { 'content-Type': 'text/html' };
          break;
        case '.css':
          headers = { 'content-Type': 'text/css' };
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
  } else if (req.method == 'POST') {
    var body = "";
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      var postData = qs.parse(body);
      /*check the JSON provided is in the correct format:
      doc = {
        title: 'Document Title',
        body: 'Document Body';
      };*/
      if (Object.prototype.hasOwnProperty.call(postData, 'title') &&
        Object.prototype.hasOwnProperty.call(postData, 'body')) {
        //If it is in the correct format you should save the document to the server.
        doc = postData;
        res.writeHead(200);
        res.end();
      } else {
        //if it is not,then you should return the correct HTTP error code for a bad request.
        res.writeHead(400);
        res.end();
      }
    });
  }
}).listen(8080);//Bind the server on port 8080, if you do not, the AJAX requests will not work