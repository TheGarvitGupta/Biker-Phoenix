

var app = angular.module('directions', []);
app.controller('directionsController', function($scope, $http) {

	$scope.search = function() {

		// Show the loader
		$scope.show = true;

		var data = get_best_path($scope.source,$scope.destination);
		jsonMake = data;

		var row = "[";

		for (var i=0; i<jsonMake[2].length; i++) {

			if (jsonMake[2][i][2].substring(0,3) == "WAL") {
				jsonMake[2][i][2] = "mode-icon-walk";
			}

			else if (jsonMake[2][i][2].substring(0,3) == "BIK") {
				jsonMake[2][i][2] = "mode-icon-bike";
			}

			else if (jsonMake[2][i][2].substring(0,3) == "SUB") {
				jsonMake[2][i][2] = "mode-icon-subway";
			}

			var row = row + "{\"start\": \"" +  jsonMake[2][i][0] + "\", \"end\": \"" + jsonMake[2][i][1] + "\", \"mode\": \"" + jsonMake[2][i][2] + "\", \"time\":" + jsonMake[2][i][3].toFixed(2) + ", \"distance\":" + jsonMake[2][i][4].toFixed(2) + "},";
		}

		row = row.substring(0, row.length-1);
		var row = row + "]";

		jsonObject = JSON.parse(row);
		$scope.path = jsonObject;
		$scope.totalTime = jsonMake[1].toFixed(2);
		$scope.show = false;
	}

	/* Set Defaults */

	$scope.source = "Grand Central Station";
	$scope.destination = "Wythe Hotel";
	$scope.search();
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