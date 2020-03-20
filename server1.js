//server1.js
'use strict';
const cors = require('cors');
const express = require('express');
const favicon = require('express-favicon');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.get('/api/model_info', (req, res) => {
  const date = fs.readFileSync('model_info.txt', 'utf8');
  return res.status(200).json({
    last_updated: date.trim()
  });
});
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || port);
console.log(`Running on http://localhost:${port}`);