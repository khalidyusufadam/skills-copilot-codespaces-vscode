// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var comments = [];

// Create web server
http.createServer(function (req, res) {
  // Parse the request URL
  var parsedUrl = url.parse(req.url, true);
  // Get the path
  var path = parsedUrl.pathname;
  // Get the query string
  var query = parsedUrl.query;
  // Get the method
  var method = req.method;

  // If the path is /, return the index.html
  if (path === '/') {
    fs.readFile('./index.html', function (err, data) {
      if (err) {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.end(data);
      }
    });
  // If the path is /comments, return the comments array
  } else if (path === '/comments') {
    res.end(JSON.stringify(comments));
  // If the path is /comments, and the method is POST, add the comment to the comments array
  } else if (path === '/comments' && method === 'POST') {
    var body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      var comment = qs.parse(body);
      comments.push(comment);
      res.end('Success');
    });
  // Otherwise, return 404
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
}).listen(3000);