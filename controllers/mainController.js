var app = angular.module('directions', []);
app.controller('directionsController', function($scope, $http) {

	$scope.search = function() {
		$http({
			method: 'GET',
			url: '/bestPath/' + $scope.source + '/' + $scope.destination
		}).then(function successCallback(response) {
			$scope.path = response.data;
			console.log(response);
		}, function errorCallback(response) {
			console.log(response);
		});
	}

	/* Set Defaults */

	$scope.source = "Walnut St & S 33rd St";
	$scope.destination = "Philadelphia Zoo";
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