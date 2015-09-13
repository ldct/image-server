var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cfenv = require('cfenv');

var app = express();
app.use(bodyParser.json({ 'limit': '10mb' }));

app.get('/', function (err, res) {
  res.sendStatus(200);
});

app.get('/:search_term', function (req, resp) {
  request.get('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=4&imgsz=small|medium&q=' + req.params.search_term, function (err, res) {
    res = JSON.parse(res.body); /* why */
    request.get(res.responseData.results[0].unescapedUrl).pipe(resp);
  });
});

var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, function() {
  console.log("server starting on " + appEnv.url);
});