const host = require('./config.js').webhost;

function parseDoc(doc) {
  const obj = {
    original_url: doc.longUrl,
    short_url: host + doc.shortUrl,
  };
  return obj;
}
module.exports = {
  parseDoc,
};

