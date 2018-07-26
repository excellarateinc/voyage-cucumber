const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const ENV = require('../../environment-variables');
const request = require('request-promise-native');

Given('the api is running', async function () {
  const response = await request({uri: `${ENV.BASE_URL}/status`, resolveWithFullResponse: true});
  assert.notEqual(response.statusCode, 404);
});

When('I hit the status endpoint', async function () {
  this.status = await request({uri: `${ENV.BASE_URL}/status`, json: true});
});

Then('I should receive a message with a status and timestamp', function () {
  const keys = Object.keys(this.status);
  assert(keys.includes('status'));
  assert(keys.includes('datetime'));
  assert.equal(this.status.status, 'alive');
});
