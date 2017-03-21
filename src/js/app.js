const express = require('express');

const config = require('./config.js');

const dbAdress = config.db.host + ':27017/' + config.db.name;

const db = require('monk')(dbAdress);

const urlHelper = require('./url.js');

const hash = require('./hash.js');

const legitUrl = urlHelper.legitUrl;
const urls = db.get('urls');
const app = express();
// encodes a number(id) to base-36, which can be used as short url
const encode = hash.encode;
const decode = hash.decode;
let counter = 0;


app.get('*', (req, res) => {
  const url = req.params['0'].slice(1);
  const validUrlToShorten = legitUrl(url);
  if (validUrlToShorten) {
    urls.findOne({ longUrl: url }).then((doc) => {
      // if url is already in the db return it
      if (doc) {
        res.send(doc);
      } else {
        // shorten the url and add it to the db
        counter += 1;
        const urlObj = {
          longUrl: url,
          shortUrl: encode(counter),
        };
        urls.insert(urlObj);
      }
      res.end();
    });
  } else {

  }
});

app.listen(8080);
