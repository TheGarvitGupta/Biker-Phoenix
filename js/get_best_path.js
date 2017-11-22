

var address1 = prompt("Enter the address:", "Penn Station");
var address2 = prompt("Enter the address:", "Union Square");

function get_mode_time(address1,address2,mode){

	if (address1 == null || address1 == "" || address2 == null || address2 == "") {
		alert("User cancelled one of the prompts");
	}
	else {
		var url_string = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+address1+"&destinations="+address2+"&mode=bicycling&key=AIzaSyCI7fCvGW2y8fVb8SzohlAzFAhDZ0eJGsI";
	}

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url_string, false ); // false for synchronous request
	xmlHttp.send(null);
	var data = JSON.parse(xmlHttp.responseText);
	
	time_seconds = data.rows[0].elements[0].duration.value;
	time_minutes = parseFloat(time_seconds)/60; //time in minutes
	
	return time_minutes

}

function geocoding(address){
	var url_string = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyD0y1Q1FGLwHEkqjPHrNeodwGCf3VRZYlA";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url_string, false ); // false for synchronous request
	xmlHttp.send( null );
	data = JSON.parse(xmlHttp.responseText);
	latitude = data.results[0].geometry.location.lat;
	longitude = data.results[0].geometry.location.lng;
	return latitude, longitude;
}

function reverse_geocoding(latitude,longitude){
	var url_string = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude +","+longitude+ "&key=AIzaSyD0y1Q1FGLwHEkqjPHrNeodwGCf3VRZYlA";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url_string, false ); // false for synchronous request
	xmlHttp.send( null );
	var data = JSON.parse(xmlHttp.responseText);
	address = data.results[0].formatted_address;
	return address;
}

function find_closest_subway_station(latitude, longitude){
	//need to write this function
	return latitude, longitude;
}

function find_closest_bike_station(latitude, longitude){
	//need to write this function
	return latitude, longitude;
}

////////////////////////////////MAIN///////////////////////////////////////

var mode = "walking" // alternatives are "walking", "bicycling", "transit&transit_mode=subway"
var time_walk_only = get_mode_time(address1,address2,mode)

latitude_start, longitude_start = geocoding(address1);
latitude_end, longitude_end = geocoding(address2);



