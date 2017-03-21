const express = require('express');

// const mongo = require('mongodb').MongoClient;

const urlHelper = require('./url.js');

const legitUrl = urlHelper.legitUrl;

const app = express();

// const config = require('./config');
const hash = require('./hash.js');

app.get('*', (req, res) => {
  const url = req.params['0'].slice(1);
  const validUrl = legitUrl(url);
  if (!validUrl) {
    res.send('invalid url');
  }
});

app.listen(8080);
