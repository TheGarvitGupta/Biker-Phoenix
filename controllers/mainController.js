var app = angular.module('directions', []);
app.controller('directionsController', function($scope, $http) {

	latitude = "100";
	longitude = "200";

	$http({
		method: 'GET',
		url: '/bestPath/' + latitude + '/' + longitude
	}).then(function successCallback(response) {
		$scope.path = response;
	}, function errorCallback(response) {
		console.log(response);
	});
});