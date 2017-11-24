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
	host: 'biker.c09mjnvqwegg.us-east-1.rds.amazonaws.com',
	user: 'admin',
	password: '1qaz2wsx',
	database: 'dummy',
	port: '8000'
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/map', function(req, res, next) {
	res.sendFile(path.join(__dirname, '/view', 'map.html'));
});

app.get('/history', function(req, res, next) {
	res.sendFile(path.join(__dirname, '/view', 'history.html'));
});

app.get('/bike-stations', function(req, res, next) {
	res.sendFile(path.join(__dirname, '/view', 'bike-stations.html'));
});

app.get('/subway-stations', function(req, res, next) {
	res.sendFile(path.join(__dirname, '/view', 'subway-stations.html'));
});

app.get('/all-bikes/:location', function(req, res) {

	var query = "SELECT * FROM bike_stations WHERE stationName LIKE '%" + req.params.location + "%'";
	console.log(query);

	connection.query(query, function(err, rows, fields) {
		if (err) {
			console.log(err);
		}
		else {
			res.send(rows);
		}
	});
});

app.get('/all-subways/:location', function(req, res) {

	var query = "SELECT * FROM subway_stations WHERE name LIKE '%" + req.params.location + "%'";
	console.log(query);

	connection.query(query, function(err, rows, fields) {
		if (err) {
			console.log(err);
		}
		else {
			res.send(rows);
		}
	});
});

app.get('/bestPath/:longitude/:latitude', function(req, res) {

	console.log("/bestPath/:" + req.params.longitude + "/:" + req.params.latitude);

	var query = "SELECT * FROM bike_stations";
	console.log(query);

	connection.query(query, function(err, rows, fields) {
		if (err) {
			console.log(err);
		}
		else {
			res.send(rows);
		}
	});
});

app.get('/closestSubway/:latitude/:longitude', function(req, res) {

	var query = 'SELECT s.id, s.longitude, s.latitude FROM subway_stations s ORDER BY  POWER((s.longitude -(' + req.params.longitude + ')),2)+POWER((s.latitude - (' + req.params.latitude + ')),2) ASC LIMIT 1';
	console.log(query);

	connection.query(query, function(err, rows, fields) {
		if (err) {
			console.log(err);
		}
		else {
			res.send(rows);
		}
	});
});

app.get('/closestBike/:latitude/:longitude', function(req, res) {

	var query = 'SELECT b.bike_station_id, b.longitude, b.latitude FROM bike_stations b ORDER BY  POWER((b.longitude -(' + req.params.longitude + ')),2)+POWER((b.latitude - (' + req.params.latitude + ')),2) ASC LIMIT 1';
	console.log(query);

	connection.query(query, function(err, rows, fields) {
		if (err) {
			console.log(err);
		}
		else {
			res.send(rows);
		}
	});
});

app.get('/closestBikeToSubway/:subway_id', function(req, res) {

	var query = 'SELECT bike_station_id, distance FROM subway_bike_shortest_distances WHERE subway_station_id ="'+ req.params.subway_id +'"';
	console.log(query);

	connection.query(query, function(err, rows, fields) {
		if (err) {
			console.log(err);
		}
		else {
			res.send(rows);
		}
	});
});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
});