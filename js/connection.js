var mysql = require('mysql');
var connection = mysql.createConnection({
  host		: 'biker.c09mjnvqwegg.us-east-1.rds.amazonaws.com',
  user		: 'admin',
  password	: '1qaz2wsx',
  database	: 'dummy'
  port		: '8000'
});
console.log(connection);