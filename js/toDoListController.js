angular.module('ToDoList', []).controller('MainController', function($scope) {
  $scope.tasks = [];

  $scope.addTask = function() {
    if ($scope.taskInput) $scope.tasks.push({name: $scope.taskInput, done: false});
    $scope.taskInput = null;
  };

  $scope.deleteTask = function (index) {
    $scope.tasks.splice(index, 1);
  };

  $scope.numberOfTasks = function () {
    return $scope.tasks.length;
  };

  $scope.toggleEditMode = function(){
    $(event.target).closest('li').toggleClass('editing');
  };

  $scope.editOnEnter = function(task){
    if(event.keyCode == 13 && task.name){
        $scope.toggleEditMode();
    }
  };
});
