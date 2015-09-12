describe('MainController', function () {
  beforeEach(module('ToDoList'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('MainController', {
      $scope: scope
    });
  }));

  it('initialises with no input', function () {
    expect(scope.taskInput).toBeUndefined();
  });

  it('initialises with no tasks', function () {
    expect(scope.tasks).toEqual([]);
  });

  var tasks = ["Do my weekend challenege", 'Actually understand Angular'];

  describe('tasks', function () {
    beforeEach(function () {
      scope.taskInput = 'Do my weekend challenege';
      scope.addTask();
      scope.taskInput = 'Actually understand Angular';
      scope.addTask();
    });

    it('stores tasks', function () {
      expect(scope.tasks).toEqual(tasks);
    });

    it('does not allow duplicate tasks', function () {
      scope.taskInput = 'Actually understand Angular';
      scope.addTask();
      expect(scope.tasks).toEqual(tasks);
    });

    it('deletes tasks', function () {
      scope.deleteTask(0);
      expect(scope.tasks).toEqual(['Actually understand Angular']);
    });

    it('counts the number of all the tasks', function () {
      expect(scope.numberOfTasks()).toEqual(2);
    });
  });
});
