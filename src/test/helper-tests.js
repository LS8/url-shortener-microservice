const chai = require('chai');

const assert = chai.assert;

const helper = require('../js/helper.js');

const verifyUrl = helper.verifyUrl;

describe('Verify Url', function() {
  it('should verify a string that starts with http', function() {
    const url = 'http://google.com';
    assert.equal(verifyUrl(url), true);
  });

  it('should verify a string that starts with https', function() {
    const url = 'https://google.com';
    assert.equal(verifyUrl(url), true);
  });
});

describe('Refuse Url', function() {
  it('should refuse a string that starts with abc', function() {
    const url = 'abc://google.com';
    assert.equal(verifyUrl(url), false);
  });

  it('should refuse a string that starts with 123', function() {
    const url = '123://google.com';
    assert.equal(verifyUrl(url), false);
  });

  it('should refuse a string that starts with htt', function() {
    const url = 'htt://google.com';
    assert.equal(verifyUrl(url), false);
  });

  it('should refuse a string that starts with ://', function() {
    const url = '://google.com';
    assert.equal(verifyUrl(url), false);
  });
});
