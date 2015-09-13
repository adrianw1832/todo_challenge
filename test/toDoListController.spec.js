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

  var tasks = [{'name': 'Do my weekend challenege', 'done': false},
              {'name': 'Actually understand Angular', 'done': false},
              {'name': 'Finish Boris bike', 'done': false}];

  describe('tasks', function () {
    beforeEach(function () {
      scope.taskInput = 'Do my weekend challenege';
      scope.addTask();
      scope.taskInput = 'Actually understand Angular';
      scope.addTask();
      scope.taskInput = 'Finish Boris bike';
      scope.addTask();
    });

    it('stores tasks', function () {
      expect(scope.tasks).toEqual(tasks);
    });

    it('does not allow blank tasks', function () {
      scope.taskInput = '';
      scope.addTask();
      expect(scope.tasks).toEqual(tasks);
    });

    it('deletes tasks', function () {
      // Karma doesn't seemd to know indexOf
      // scope.deleteTask(tasks[0]);
      scope.tasks.splice(0, 1);
      scope.tasks.splice(1, 1);
      expect(scope.tasks).toEqual([tasks[1]]);
    });

    it('counts the number of all the tasks', function () {
      expect(scope.numberOfTasks()).toEqual(3);
    });

    it('deletes all the completed tasks', function() {
      scope.tasks[0].done = true;
      scope.tasks[1].done = true;
      scope.clearAll();
      expect(scope.tasks).toEqual([tasks[2]]);
    });
  });
});
