const environmentVariables = {
  development: {
    BASE_URL: 'http://192.168.1.13:8080/api',
    OAUTH_URL: 'http://192.168.1.13:8080/oauth/token',
    USERNAME: 'client-super',
    PASSWORD: 'secret',
    CLIENT_ID: 'client-super',
    CLIENT_SECRET: 'client-secret',
  }
};

const environment = process.env.NODE_ENV || 'development';

console.log(environment);

module.exports = environmentVariables[environment];