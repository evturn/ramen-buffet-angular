var ramenTodo = angular.module('ramenTodo', []);

function mainController($scope, $http) {
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error:' + data);
		});
};