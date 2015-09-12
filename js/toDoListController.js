angular.module('ToDoList', []).controller('MainController', function($scope) {
  $scope.tasks = [];

  $scope.addTask = function() {
    $scope.tasks.push($scope.taskInput);
  };

  $scope.deleteTask = function (index) {
    $scope.tasks.splice(index, 1);
  };
});
