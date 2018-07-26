const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const ENV = require('../../environment-variables');
const request = require('request-promise-native');
const btoa = require('btoa');

Given('I have a valid username and password', function () {
  this.username = ENV.USERNAME;
  this.password = ENV.PASSWORD;
});

Given('I have an invalid username and password', function () {
  this.username = 'asdf';
  this.password = 'asdf';
});

When('I attempt to get an access token from the API', async function () {
  const clientCredentials = `${this.username}:${this.password}`;
  try {
    this.responseJson = await request({
      method: 'POST',
      uri: ENV.OAUTH_URL,
      form: {
        client_id: 'client-super',
        client_secret: 'secret',
        grant_type: 'client_credentials'
      },
      headers: {
        Authorization: `Basic ${btoa(clientCredentials)}`
      }
    });
  } catch(error) {
    this.responseJson = error.error;
  }
});

Then('I will receive an access token', function () {
  const tokenData = JSON.parse(this.responseJson);
  const keys = Object.keys(tokenData);
  assert(keys.includes('created'));
  assert(keys.includes('access_token'));
});

Then('I will receive a 401 error for no matching username and password', function () {
  const [errorData] = JSON.parse(this.responseJson);
  assert.equal(errorData.errorDescription, '401 Unauthorized. No client was found for the given username and password');
});