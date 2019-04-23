const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const ENV = require('../../environment-variables');
const request = require('request-promise-native');
const btoa = require('btoa');
var accessToken = "a"; // a variable to store the access token

Given('I have a valid credentials', function () {
    this.username = ENV.USERNAME;
    this.password = ENV.PASSWORD;
});

When('attempt to get an access token', async function () {
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

When('I attempt to get users list from the API', async function () {
    try {
        this.responseJson = await request({
            method: 'GET',
            uri: ENV.USERS_LIST_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

When('I attempt to get a single user with id 1 from the API', async function () {
    try {
        this.responseJson = await request({
            method: 'GET',
            uri: ENV.GET_USER_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

When('I make a POST request to users', async function () {
    try {
        this.responseJson = await request({
            method: 'POST',
            uri: ENV.POST_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body:{
                "firstName": "user",
                "lastName": 'user',
                "username": 'newUser'
            },
            json: true
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

Then('receive an access token successfully', function () {
    const tokenData = JSON.parse(this.responseJson);
    const keys = Object.keys(tokenData);
    assert(keys.includes('created'));
    assert(keys.includes('access_token'));
});

Then('I will receive a list of users', function () {
    const users = JSON.parse(this.responseJson);
    assert.equal(users.length, 2);
    assert.equal(users[0].id, 1);
    assert.equal(users[0].firstName, 'Super');
    assert.equal(users[1].id, 2);
    assert.equal(users[1].firstName, 'Standard');
});

Then('The response will be a user with id 1', function () {
    const user = JSON.parse(this.responseJson);
    assert.equal(user.id, 1);
    assert.equal(user.firstName, 'Super');
});

Then('New user will be save', function () {
    const savedUser = JSON.parse(this.responseJson);
});