function legitUrl(url) {
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return true;
  }
  return false;
}
module.exports = {
  legitUrl,
};
