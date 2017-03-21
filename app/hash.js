const alphabet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = alphabet.length;

function encode(numberToEncode) {
  let encoded = '';
  let num = numberToEncode;
  while (num) {
    const rest = num % base;
    num = Math.floor(num / base);
    encoded = alphabet[rest].toString() + encoded;
  }
  return encoded;
}

function decode(stringToDecode) {
  let str = stringToDecode;
  let decoded = 0;
  while (str) {
    const index = alphabet.indexOf(str[0]);
    const power = str.length - 1;
    decoded += index * Math.pow(base, power);
    str = str.slice(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;
