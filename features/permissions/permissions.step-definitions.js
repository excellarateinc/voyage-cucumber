const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const ENV = require('../../environment-variables');
const request = require('request-promise-native');
const btoa = require('btoa');
let accessToken = "a"; // a variable to store the access token

Given('I have a valid credentials, for permissions', function () {
    this.username = ENV.USERNAME;
    this.password = ENV.PASSWORD;
});

When('Attempt to get an access token, for permissions', async function () {
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

When('I attempt to get permissions list from the API', async function () {
    try {
        this.responseJson = await request({
            method: 'GET',
            uri: ENV.PERMISSIONS_LIST_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

When('I attempt to get a single permission with id 1 from the API', async function () {
    try {
        this.responseJson = await request({
            method: 'GET',
            uri: ENV.GET_PERMISSION_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

When('I make a POST request to permissions', async function () {
    try {
        this.responseJson = await request({
            method: 'POST',
            uri: ENV.POST_PERMISSION_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body:{
                "name": "new.permission",
                "description": "this is a new test permission",
                "isImmutable": false
            },
            json: true
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

When('Attempt to update name of permission having id 17', async function () {
    try {
        this.responseJson = await request({
            method: 'PUT',
            uri: ENV.PUT_PERMISSION_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body:{
                "id": 17,  
                "name": "new.permission.updated",
                "description": "this is a new test permission",
                "isImmutable": false
            },
            json: true
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

When('Attempt to delete a permission', async function () {
    try {
        this.responseJson = await request({
            method: 'DELETE',
            uri: ENV.DELETE_PERMISSION_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

Then('Receive an access token successfully, for permissions', function () {
    const tokenData = JSON.parse(this.responseJson);
    const keys = Object.keys(tokenData);
    assert(keys.includes('created'));
    assert(keys.includes('access_token'));
});

Then('I will receive a list of permissions', function () {
    const permissions = JSON.parse(this.responseJson);
    assert.equal(permissions.length, 16);
    assert.equal(permissions[0].name, 'api.users.list');
    assert.equal(permissions[1].name, 'api.users.get');
    assert.equal(permissions[10].name, 'api.permissions.list');
    assert.equal(permissions[15].name, 'api.profiles.me');
});

Then('The response will be a permission with id 1', function () {
    const permission = JSON.parse(this.responseJson);
    assert.equal(permission.id, 1);
    assert.equal(permission.name, 'api.users.list');
});

Then('New permission will be save', function () {
    const permission = this.responseJson;
    assert.equal(permission.id, 17);
    assert.equal(permission.name, 'new.permission');
});

Then('Permission updated successfully', function () {
    const permission = this.responseJson;
    assert.equal(permission.id, 17);
    assert.equal(permission.name, 'new.permission.updated');
});

Then('Permission deleted successfully', function () {
});
