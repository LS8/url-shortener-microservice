const express = require('express');

// const mongo = require('mongodb').MongoClient;

const helper = require('./helper.js');

const verifyUrl = helper.verifyUrl;

const app = express();

const mongoose = require('mongoose');

const config = require('./config');
// base58 for encoding and decoding functions
const hash = require('./hash.js');

// grab the url model
const urlModel = require('./url.js');

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.get('*', (req, res) => {
  const url = req.params['0'].slice(1);
  const validUrl = verifyUrl(url);
  if (!validUrl) {
    res.send('invalid url');
  }
  const id = hash.decode(validUrl);
  urlModel.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webhost);
    }
  })
});

app.listen(8080);
