const environmentVariables = {
  development: {
    BASE_URL: 'http://localhost:8080/api',
    OAUTH_URL: 'http://localhost:8080/oauth/token',
    USERS_LIST_URL: 'http://localhost:8080/api/v1/users',
    GET_USER_URL: 'http://localhost:8080/api/v1/users/1',
    POST_URL: 'http://localhost:8080/api/v1/users',
    PUT_URL: 'http://localhost:8080/api/v1/users/3',
    DELETE_URL: 'http://localhost:8080/api/v1/users/3',
    USERNAME: 'client-super',
    PASSWORD: 'secret',
    CLIENT_ID: 'client-super',
    CLIENT_SECRET: 'client-secret',
  }
};

const environment = process.env.NODE_ENV || 'development';

console.log(environment);

module.exports = environmentVariables[environment];