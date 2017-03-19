function verifyUrl(url) {
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return true;
  }
  return false;
}
module.exports = {
  verifyUrl,
};
