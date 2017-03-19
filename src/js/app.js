const express = require('express');

const helper = require('./helper.js');

const verifyUrl = helper.verifyUrl;

const app = express();

app.get('*', (req, res) => {
  const url = req.params['0'].slice(1);
  const validUrl = verifyUrl(url);
  if (!validUrl) {
    res.send('invalid url');
  }
});

app.listen(8080);
