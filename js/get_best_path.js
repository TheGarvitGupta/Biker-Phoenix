function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var address1 = prompt("Enter the address:", "Penn Station");
var address2 = prompt("Enter the address:", "Union Square");

function get_walk_time(address1,address2){

	var mode = "walking"

	if (address1 == null || address1 == "" || address2 == null || address2 == "") {
		alert("User cancelled one of the prompts");
	}
	else {
		var url_string = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+address1+"&destinations="+address2+"&mode="+mode+"&key=AIzaSyCI7fCvGW2y8fVb8SzohlAzFAhDZ0eJGsI";
	}

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url_string, false ); // false for synchronous request
	xmlHttp.send(null);
	var data = JSON.parse(xmlHttp.responseText);
	
	var time_seconds = data.rows[0].elements[0].duration.value;
	var time_minutes = parseFloat(time_seconds)/60; //time in minutes
	
	return time_minutes

}

function get_bike_time(bike_station_id1, bike_station_id2){
	//we'll have to include the biking times in the table and then run a query
	var bike_time = 222.23
	return bike_time;
}

function get_subway_time(subway_station_id1, subway_station_id2){
	//we'll have to include the subway times in the table and then run a query
	var subway_time = 222.23
	return subway_time;
}

function geocoding(address){
	var url_string = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyD0y1Q1FGLwHEkqjPHrNeodwGCf3VRZYlA";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url_string, false ); // false for synchronous request
	xmlHttp.send( null );
	var data = JSON.parse(xmlHttp.responseText);
	var latitude = data.results[0].geometry.location.lat;
	var longitude = data.results[0].geometry.location.lng;
	return latitude, longitude;
}

function reverse_geocoding(latitude,longitude){
	var url_string = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude +","+longitude+ "&key=AIzaSyD0y1Q1FGLwHEkqjPHrNeodwGCf3VRZYlA";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url_string, false ); // false for synchronous request
	xmlHttp.send( null );
	var data = JSON.parse(xmlHttp.responseText);
	var address = data.results[0].formatted_address;
	return address;
}

function find_closest_subway_station(address){
	
	var latitude, var longitude = geocoding(address);

	var url = "/closestSubway/:" + latitude + "/:" + longitude;
    response = httpGet(url);

    console.log(response);

	var subway_station_id = response.id;
	var subway_station_latitude = response.latitude;
	var subway_station_longitude = response.longitude;

	//calculate walking time to address of the station found
	var subway_station_address = reverse_geocoding(subway_station_latitude,subway_station_longitude);
	var walking_time = get_mode_time(address,subway_station_address);
	return subway_station_id, walking_time;
}

function find_closest_bike_station(address){

	var latitude, var longitude = geocoding(address);
	//here goes SQL query that returns closes bike_station_id, its latitude and longitude
	var bike_station_id = 15;
	var bike_station_latitude = 40.829382;
	var bike_station_longitude = -72.343221;

	//calculate walking time to address of the station found
	var bike_station_address = reverse_geocoding(bike_station_latitude,bike_station_longitude);
	var walking_time = get_walk_time(address,bike_station_address);
	return bike_station_id, walking_time;
}

function find_closest_bike_to_subway(subway_station_id){

	//here goes SQL query that returns closes bike_station_id, its latitude and longitude
	var bike_station_id = 15;
	var walk_time_bike_to_subway;
	return bike_station_id, walk_time_bike_to_subway;
}

////////////////////////////////MAIN///////////////////////////////////////

var time_walk_only = get_walk_time(address1,address2);

//latitude_start, longitude_start = geocoding(address1);
//latitude_end, longitude_end = geocoding(address2);

var near_subway_station_start, var near_subway_start_walktime = find_closest_subway_station(address1);
var near_subway_station_end, var near_subway_end_walktime = find_closest_subway_station(address2);

var near_bike_station_start, var near_bike_start_walktime = find_closest_bike_station(address1);
var near_bike_station_end, var near_bike_end_walktime = find_closest_bike_station(address2);

var bike_time = get_bike_time(near_bike_station_start,near_bike_station_end);
var subway_time = get_subway_time(near_subway_station_start,near_subway_station_end);

var bike_near_subway_start, var walk_from_bike_to_subway = find_closest_bike_to_subway(near_subway_station_start);
var bike_near_subway_end, var walk_from_subway_to_bike = find_closest_bike_to_subway(near_subway_station_start);

var bike_time_start = get_bike_time(near_bike_station_start,bike_near_subway_start);
var bike_time_end = get_bike_time(near_bike_station_end,bike_near_subway_end);


//NOW WE COMPUTE THE TRAVEL TIME FOR EACH MODE

var total_time_walk = time_walk_only;

var total_time_bike = near_bike_start_walktime + bike_time + near_bike_end_walktime;

var total_time_subway = near_subway_start_walktime + subway_time + near_subway_end_walktime;

var total_time_bike_subway = near_bike_start_walktime + bike_time_start + walk_from_bike_to_subway + subway_time + near_subway_end_walktime;

var total_time_subway_bike = near_subway_start_walktime + subway_time + walk_from_subway_to_bike + bike_time_end + near_bike_end_walktime;

var total_time_bike_subway_bike = near_bike_start_walktime + bike_time_start + walk_from_bike_to_subway + subway_time + walk_from_subway_to_bike + bike_time_end + near_bike_end_walktime;





