function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function find_closest_subway_station(address){
	
	response = geocoding(address);
	latitude = response[0]
	longitude = response[1]

	var url = "../closestSubway/" + latitude + "/" + longitude;
    response2 = httpGet(url);
    response2 = eval(response2)[0];

	var subway_station_id = response2.id;
	var subway_station_latitude = response2.latitude;
	var subway_station_longitude = response2.longitude;

	//calculate walking time to address of the station found
	var subway_station_address = reverse_geocoding(subway_station_latitude,subway_station_longitude);
	var walking_time = get_walk_time(address,subway_station_address);

	return [subway_station_id, subway_station_address, walking_time];
}

function find_closest_bike_station(address){

	response = geocoding(address);

	latitude = response[0];
	longitude = response[1];
	//here goes SQL query that returns closes bike_station_id, its latitude and longitude
	url = '/closestBike/'+latitude+'/'+longitude;
	response2 = httpGet(url);
	
	response2 = eval(response2);
	//response2 = JSON.parse(response2);
	

	var bike_station_id = response2[0].bike_station_id;
	var bike_station_latitude = response2[0].latitude;
	var bike_station_longitude = response2[0].longitude;

	//calculate walking time to address of the station found

	var bike_station_address = reverse_geocoding(bike_station_latitude,bike_station_longitude);
	var walking_time = get_walk_time(address,bike_station_address);
	return [bike_station_id, bike_station_address, walking_time];
}

function find_closest_bike_to_subway(subway_station_id){

	//here goes SQL query that returns closes bike_station_id, its latitude and longitude
	url = '/closestBikeToSubway/'+subway_station_id;
	response2 = httpGet(url);
	
	response2 = eval(response2);

	bike_station_id = response2[0].bike_station_id;
	bike_station_latitude = response2[0].blat;
	bike_station_longitude = response2[0].blong;

	subway_station_latitude = response2[0].slat;
	subway_station_longitude = response2[0].slong;

	address_bike = reverse_geocoding(bike_station_latitude,bike_station_longitude);
	address_subway = reverse_geocoding(subway_station_latitude,subway_station_longitude);

	walk_time_bike_to_subway = get_walk_time(address_bike,address_subway);
	
	return [bike_station_id, address_bike, walk_time_bike_to_subway];
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

	var data = httpGet(url_string);
	var data = eval(JSON.parse(data));
	
	var time_seconds = data.rows[0].elements[0].duration.value;
	var time_minutes = parseFloat(time_seconds)/60; //time in minutes
	
	return time_minutes;

}

function get_bike_time(address1,address2){

	var mode = "bicycling"

	if (address1 == null || address1 == "" || address2 == null || address2 == "") {
		alert("User cancelled one of the prompts");
	}
	else {
		var url_string = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+address1+"&destinations="+address2+"&mode="+mode+"&key=AIzaSyCI7fCvGW2y8fVb8SzohlAzFAhDZ0eJGsI";
	}

	var data = httpGet(url_string);
	var data = eval(JSON.parse(data));
	
	var time_seconds = data.rows[0].elements[0].duration.value;
	var time_minutes = parseFloat(time_seconds)/60; //time in minutes
	
	return time_minutes;

}

function get_subway_time(address1,address2){

	var mode = "transit&transit_mode=subway"

	if (address1 == null || address1 == "" || address2 == null || address2 == "") {
		alert("User cancelled one of the prompts");
	}
	else {
		var url_string = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+address1+"&destinations="+address2+"&mode="+mode+"&key=AIzaSyCI7fCvGW2y8fVb8SzohlAzFAhDZ0eJGsI";
	}

	var data = httpGet(url_string);
	var data = eval(JSON.parse(data));
	
	var time_seconds = data.rows[0].elements[0].duration.value;
	var time_minutes = parseFloat(time_seconds)/60; //time in minutes
	
	return time_minutes;

}




function get_best_path(address1,address2){


	time_walk_only = get_walk_time(address1,address2);

	//latitude_start, longitude_start = geocoding(address1);
	//latitude_end, longitude_end = geocoding(address2);


	response1 = find_closest_subway_station(address1);

	near_subway_station_start_id = response1[0];
	near_subway_station_start_address = response1[1];


	near_subway_start_walktime = response1[2];

	response2 = find_closest_subway_station(address2);

	near_subway_station_end_id = response2[0];
	near_subway_station_end_address = response2[1];

	near_subway_end_walktime = response2[2];

	response3 = find_closest_bike_station(address1);

	near_bike_station_start_id = response3[0];
	near_bike_station_start_address = response3[1];

	near_bike_start_walktime = response3[2];


	response4 = find_closest_bike_station(address2);

	near_bike_station_end_id = response4[0];
	near_bike_station_end_address = response4[1];


	near_bike_end_walktime = response4[2];


	bike_time = get_bike_time(near_bike_station_start_address,near_bike_station_end_address);

	subway_time = get_subway_time(near_subway_station_start_address,near_subway_station_end_address);

	
	response5 = find_closest_bike_to_subway(near_subway_station_start_id);

	bike_near_subway_start_address = response5[1];

	walk_from_bike_to_subway = response5[2];

	response6 = find_closest_bike_to_subway(near_subway_station_end_id);

	bike_near_subway_end_address = response6[1];


	walk_from_subway_to_bike = response6[2];

	bike_time_start = get_bike_time(near_bike_station_start_address,bike_near_subway_start_address);

	bike_time_end = get_bike_time(near_bike_station_end_address,bike_near_subway_end_address);

	alert("24");


	//NOW WE COMPUTE THE TRAVEL TIME FOR EACH MODE

	var total_time_walk = time_walk_only;

	var total_time_bike = near_bike_start_walktime + bike_time + near_bike_end_walktime;

	var total_time_subway = near_subway_start_walktime + subway_time + near_subway_end_walktime;

	var total_time_bike_subway = near_bike_start_walktime + bike_time_start + walk_from_bike_to_subway + subway_time + near_subway_end_walktime;

	var total_time_subway_bike = near_subway_start_walktime + subway_time + walk_from_subway_to_bike + bike_time_end + near_bike_end_walktime;

	var total_time_bike_subway_bike = near_bike_start_walktime + bike_time_start + walk_from_bike_to_subway + subway_time + walk_from_subway_to_bike + bike_time_end + near_bike_end_walktime;

	walk_instructions = "Just walk the entire way"
	bike_instructions = "Walk to the bike station in "+near_bike_station_start_address+", then bike to the bike station in "+near_bike_station_end_address+"and then walk to your destination"

	return [bike_instructions,total_time_bike];


}

var address1 = prompt("Enter the address:", "Grand+Central+Station+NY");
var address2 = prompt("Enter the address:", "Hotel+Chantelle+NY");

if (address1 == null || address1 == "" || address2 == null || address2 == "") {
	alert("User cancelled the prompt");
}

else {
	response = get_best_path(address1,address2);
	instructions = response[0];
	time = response[1];
}


//var xmlHttp = new XMLHttpRequest();
//xmlHttp.open( "GET", url_string, false ); // false for synchronous request
//xmlHttp.send( null );
//var data1 = station_id;
// var data2 = walking_time;

alert(instructions);
alert("Total time"+time);


