angular.module('ToDoList', []).controller('MainController', function($scope) {
  $scope.tasks = [];

  $scope.addTask = function() {
    if ($scope.tasks.indexOf($scope.taskInput) === -1) $scope.tasks.push($scope.taskInput);
  };

  $scope.deleteTask = function (index) {
    $scope.tasks.splice(index, 1);
  };

  $scope.numberOfTasks = function () {
    return $scope.tasks.length;
  };
});
