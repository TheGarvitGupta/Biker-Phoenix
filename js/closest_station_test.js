

var address1 = prompt("Enter the address:", "Penn Station");

function find_closest_subway_station(address){
	
	response = geocoding(address);
	latitude = response[0]
	longitude = response[1]

	console.log(latitude);

	var url = "/closestSubway/:" + latitude + "/:" + longitude;
    response2 = httpGet(url);

    console.log(response2);

	var subway_station_id = response2.id;
	var subway_station_latitude = response2.latitude;
	var subway_station_longitude = response2.longitude;

	//calculate walking time to address of the station found
	var subway_station_address = reverse_geocoding(subway_station_latitude,subway_station_longitude);
	var walking_time = get_walk_time(address,subway_station_address);
	return [subway_station_id, walking_time];
}

function geocoding(address){
	var url_string = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyD0y1Q1FGLwHEkqjPHrNeodwGCf3VRZYlA";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url_string, false ); // false for synchronous request
	xmlHttp.send( null );
	var data = JSON.parse(xmlHttp.responseText);
	var latitude = data.results[0].geometry.location.lat;
	var longitude = data.results[0].geometry.location.lng;
	return [latitude, longitude];
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
	
	return time_minutes;

}

if (address1 == null || address1 == "") {
	alert("User cancelled the prompt");
}

else {
	response = find_closest_subway_station(address1);
	station_id = response[0];
	station_id = response[1];
}


var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", url_string, false ); // false for synchronous request
xmlHttp.send( null );
var data1 = station_id;
var data2 = walking_time;

alert(data1);
alert(data2);