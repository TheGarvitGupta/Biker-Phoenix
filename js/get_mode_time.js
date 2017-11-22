

var address1 = prompt("Enter the address:", "Penn Station");
var address2 = prompt("Enter the address:", "Union Square");
var mode = "transit&transit_mode=subway" // alternatives are "walking" and "bicycling"

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
alert(data["destination_addresses"]);
alert(data["origin_addresses"]);
str = data.rows[0].elements[0].duration.value;
alert(xmlHttp.responseText);
alert(parseFloat(str)/60); //time in minutes
//alert(xmlHttp.responseText); //responseText

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: 0, lng: -180},
    mapTypeId: 'terrain'
  });

  var flightPlanCoordinates = [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}
