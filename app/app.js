const express = require('express');

const config = require('./config.js');

const dbAdress = process.env.MONGOLAB_URI;

const db = require('monk')(dbAdress);

const urlHelper = require('./url.js');

const hash = require('./hash.js');

const parseDoc = require('./res-obj.js').parseDoc;

const legitUrl = urlHelper.legitUrl;
const urls = db.get('urls');
const app = express();
// encodes a number(id) to base-36, which can be used as short url
const encode = hash.encode;
let counter = 0;


app.get('*', (req, res) => {
  const url = req.params['0'].slice(1);
  const validUrlToShorten = legitUrl(url);
  if (validUrlToShorten) {
    urls.findOne({ longUrl: url }).then((doc) => {
      // if url is already in the db return it
      if (doc) {
        res.send(parseDoc(doc));
      } else {
        // shorten the url and add it to the db
        counter += 1;
        const urlObj = {
          longUrl: url,
          shortUrl: encode(counter),
        };
        urls.insert(urlObj);
        res.send(parseDoc(urlObj));
      }
      res.end();
    }).catch(() => res.send('Request rejected'));
  } else {
    urls.findOne({ shortUrl: url }).then((doc) => {
      if (doc) {
        const longUrl = parseDoc(doc).original_url;
        res.redirect(longUrl);
      } else {
        res.send('No url match');
      }
    }).catch(() => res.send('Request rejected'));
  }
});

app.listen(process.env.PORT || 8080);
