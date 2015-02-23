angular.module('todoController', [])
	.controller('mainController', function($scope, $http) {
		$scope.formData = {};

  Todos.get()
    .success(function(data) {
      $scope.todos = data;
    });

  $scope.createTodo = function() {
    if (!$.isEmptyObjects($scope.formData)) {
      Todos.create($scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $score.todos = data;
      });
    }
  };

  $score.deleteTodo = function(id) {
    Todos.delete(id)
      .success(function(data) {
        $scope.todos = data;
      });
  };

});