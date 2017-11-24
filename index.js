var express = require('express')
var app = express()
var path = require('path');
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/controllers", express.static(__dirname + '/controllers'));

/* Connection Here */
var mysql = require('mysql');
var connection = mysql.createConnection({
  host		: 'biker.c09mjnvqwegg.us-east-1.rds.amazonaws.com',
  user		: 'admin',
  password	: '1qaz2wsx',
  database	: 'dummy',
  port		: '8000'
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/bestPath/:longitude/:latitude', function (req, res) {
  res.send('hello world')
})
// app.get('/', function(request, response) {

//   var query = "SELECT * FROM bike_stations"
//   console.log(query);

// 	connection.query(query, function(err, rows, fields) {
// 		if (err) console.log(err);
// 			else {
// 			response.send(rows);
// 		}  
// 	});
// })

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
