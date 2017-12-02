

var app = angular.module('directions', []);
app.controller('directionsController', function($scope, $http) {

	$scope.search = function() {
		
		// Call Nacho's function here and store the response in a variable called 'data'
		var data = get_best_path($scope.source,$scope.destination);
		//jsonMake = JSON.stringify(data);
		jsonMake = data;

		var row = "[";

		for (var i=0; i<jsonMake[2].length; i++) {
			var row = row + "{\"start\": \"" +  jsonMake[2][i][0] + "\", \"end\": \"" + jsonMake[2][i][1] + "\", \"mode\": \"" + jsonMake[2][i][2] + "\", \"time\":" + jsonMake[2][i][3].toFixed(2) + ", \"distance\":" + jsonMake[2][i][4].toFixed(2) + "},";
		}

		row = row.substring(0, row.length-1);
		var row = row + "]";

		console.log(row);

		jsonObject = JSON.parse(row);

		$scope.path = jsonObject;

		console.log(jsonObject);
	}

	/* Set Defaults */

	$scope.source = "Grand Central Station";
	$scope.destination = "Wythe Hotel";
	// $scope.search();
});

var app = angular.module('bike-stations', []);
app.controller('allBikes', function($scope, $http) {

	$scope.search = function() {
		$http({
			method: 'GET',
			url: '/all-bikes/' + $scope.name
		}).then(function successCallback(response) {
			$scope.matches = response.data;
			console.log(response);
		}, function errorCallback(response) {
			console.log(response);
		});
	}

	/* Set Defaults */

	$scope.name = "Queens";
	$scope.search();
});

var app = angular.module('subway-stations', []);
app.controller('allSubways', function($scope, $http) {

	$scope.search = function() {
		$http({
			method: 'GET',
			url: '/all-subways/' + $scope.name
		}).then(function successCallback(response) {
			$scope.matches = response.data;
			console.log(response);
		}, function errorCallback(response) {
			console.log(response);
		});
	}

	/* Set Defaults */

	$scope.name = "Queens";
	$scope.search();
});