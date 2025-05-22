var DB = require('./db').DB;

var User = DB.Model.extend({
   tableName: 'scms_users',
   idAttribute: 'userId',
});

module.exports = {
   User: User
};