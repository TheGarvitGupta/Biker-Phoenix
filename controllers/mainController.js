

var app = angular.module('directions', []);
app.controller('directionsController', function($scope, $http) {

	$scope.search = function() {
		
		// Call Nacho's function here and store the response in a variable called 'data'
		var data = JSON.stringify(get_best_path($scope.source,$scope.destination));
		$scope.path = data;
		console.log(data);
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