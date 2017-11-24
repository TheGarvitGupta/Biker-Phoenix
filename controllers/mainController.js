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