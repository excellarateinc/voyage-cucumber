const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const ENV = require('../../environment-variables');
const request = require('request-promise-native');
const btoa = require('btoa');
var accessToken = "a"; // a variable to store the access token

Given('I have a valid credentials, for roles', function () {
    this.username = ENV.USERNAME;
    this.password = ENV.PASSWORD;
});

When('Attempt to get an access token, for roles', async function () {
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


When('I attempt to get roles list from the API', async function () {
    try {
        this.responseJson = await request({
            method: 'GET',
            uri: ENV.ROLES_LIST_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

When('I attempt to get a single record of role with id 1 from the API', async function () {
    try {
        this.responseJson = await request({
            method: 'GET',
            uri: ENV.GET_ROLE_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

When('I make a POST request to roles', async function () {
    try {
        this.responseJson = await request({
            method: 'POST',
            uri: ENV.POST_ROLE_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body:{
                "name": "New Role",
                "authority": "new.role"
            },
            json: true
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

When('Attempt to update name of role having id 3', async function () {
    try {
        this.responseJson = await request({
            method: 'PUT',
            uri: ENV.PUT_ROLE_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body:{
                "id": 13, // ==============================>>> change it to 3
                "name": "New Role updated",
                "authority": "new.role"
            },
            json: true
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

When('Attempt to delete a role', async function () {
    try {
        this.responseJson = await request({
            method: 'DELETE',
            uri: ENV.DELETE_ROLE_URL,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch(error) {
        this.responseJson = error.error;
    }
});

Then('Receive an access token successfully, for roles', function () {
    const tokenData = JSON.parse(this.responseJson);
    const keys = Object.keys(tokenData);
    assert(keys.includes('created'));
    assert(keys.includes('access_token'));
});

Then('I will receive a list of roles', function () {
    const roles = JSON.parse(this.responseJson);
    assert.equal(roles.length, 2);
    assert.equal(roles[0].id, 1);
    assert.equal(roles[0].authority, 'role.super');
    assert.equal(roles[1].id, 2);
    assert.equal(roles[1].authority, 'role.standard_user');
    console.log(roles);
});

Then('The response will be a record of role with id 1', function () {
    const role = JSON.parse(this.responseJson);
    assert.equal(role.id, 1);
    assert.equal(role.authority, 'role.super');
});

Then('New role will be save', function () {
    const newRole = this.responseJson;
    assert.equal(newRole.id, 13); // ==============================>>> change it to 3
    assert.equal(newRole.authority, 'new.role');
});

Then('Role updated successfully', function () {
    const role = this.responseJson;
    assert.equal(role.id, 13); // ==============================>>> change it to 3
    assert.equal(role.name, 'New Role updated');
});

Then('Role deleted successfully', function () {
});