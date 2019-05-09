const environmentVariables = {
  development: {
    BASE_URL: 'http://localhost:8080/api',
    OAUTH_URL: 'http://localhost:8080/oauth/token',
    USERS_LIST_URL: 'http://localhost:8080/api/v1/users',
    //users
    GET_USER_URL: 'http://localhost:8080/api/v1/users/1',
    POST_URL: 'http://localhost:8080/api/v1/users',
    PUT_URL: 'http://localhost:8080/api/v1/users/3',
    DELETE_URL: 'http://localhost:8080/api/v1/users/3',

    // roles
    ROLES_LIST_URL: 'http://localhost:8080/api/v1/roles',
    GET_ROLE_URL: 'http://localhost:8080/api/v1/roles/1',
    POST_ROLE_URL: 'http://localhost:8080/api/v1/roles',
    PUT_ROLE_URL: 'http://localhost:8080/api/v1/roles/3',
    DELETE_ROLE_URL: 'http://localhost:8080/api/v1/roles/3',

    //profile
    POST_PROFILE_URL: 'http://localhost:8080/api/v1/profiles/register',
    GET_PROFILE_URL: 'http://localhost:8080/api/v1/profiles/me',

    //permissions
    PERMISSIONS_LIST_URL: 'http://localhost:8080/api/v1/permissions',
    GET_PERMISSION_URL: 'http://localhost:8080/api/v1/permissions/1',
    POST_PERMISSION_URL: 'http://localhost:8080/api/v1/permissions',
    PUT_PERMISSION_URL: 'http://localhost:8080/api/v1/permissions/17',
    DELETE_PERMISSION_URL: 'http://localhost:8080/api/v1/permissions/17',

    USERNAME: 'client-super',
    PASSWORD: 'secret',
    CLIENT_ID: 'client-super',
    CLIENT_SECRET: 'client-secret',
  }
};

const environment = process.env.NODE_ENV || 'development';

console.log(environment);

module.exports = environmentVariables[environment];