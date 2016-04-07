var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var mustache = require('mustache');
var purify = require('purify-css');

var index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

app.use('/bootstrap.min.css', express.static(path.join(__dirname, 'bootstrap.min.css')));

app.get('/', function (req, res) {
  var markup = {
    css: 'bootstrap.min.css',
    criticalCSS: ''
  };
  var html = mustache.to_html(index, markup);

  purify(html, [markup.css], {
    minify: true,
    output: false,
    info: false,
    rejected: false
  }, function (purifiedOutput) {
    markup.criticalCSS = purifiedOutput;
    html = mustache.to_html(index, markup);

    res.send(html);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
