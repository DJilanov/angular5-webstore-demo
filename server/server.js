let express = require('express');
let app = express();
let path = require('path');

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

app.listen(2112, function () {
  console.log('App started');
});