// Do *NOT* commit this file to your public repos
var credentials = {
  // Your mongo auth URI goes here
  // e.g. mongodb://username:server@mongoserver:10059/somecollection
  mongoose_auth_local: 'mongodb://localhost/someDatabase',
  mongoose_auth_heroku: 'copy and paste your unique connection string uri from the heroku admin'
}

module.exports = credentials;
