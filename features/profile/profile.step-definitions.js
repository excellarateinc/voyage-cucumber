const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const ENV = require('../../environment-variables');
const request = require('request-promise-native');
const btoa = require('btoa');
let accessToken = "a"; // a variable to store the access token

Given('I have a valid credentials, for profile', function () {
    this.username = ENV.USERNAME;
    this.password = ENV.PASSWORD;
});

When('Attempt to get an access token, for profile', async function () {
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
        accessToken = JSON.parse(this.responseJson)["access_token"];
    } catch (error) {
        this.responseJson = error.error;
    }
});

When('Attempt to register a new User profile', async function () {
    try {
        this.responseJson = await request({
            method: 'POST',
            uri: ENV.POST_PROFILE_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body:{
                "firstName": "foo profile",
                "lastName": "bar profile",
                "username": "foobarprofile",
                "password": "1a34A67*",
                "phones": [
                    {
                        "phoneType": "Mobile",
                        "phoneNumber": "16518886022"
                    }
                ]
            },
            json: true,
            resolveWithFullResponse: true
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

When('Attempt to retrieve a user\'s profile', async function () {
    try {
        this.responseJson = await request({
            method: 'GET',
            uri: ENV.GET_PROFILE_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }//,
            //resolveWithFullResponse: true
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

Then('Receive an access token successfully, for profile', function () {
    const tokenData = JSON.parse(this.responseJson);
    const keys = Object.keys(tokenData);
    assert(keys.includes('created'));
    assert(keys.includes('access_token'));
});

Then('Profile created successfully', function () {
    assert.equal(this.responseJson.headers.location, "/v1/profiles/me");
});

Then('User\'s profile will retrieve', function () {
    console.log(tokenData);

});