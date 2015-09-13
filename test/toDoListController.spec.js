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

  var tasks = [{name: "Do my weekend challenege", done: false},
              {name: 'Actually understand Angular', done: false}];

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

    it('does not allow blank tasks', function () {
      scope.taskInput = '';
      scope.addTask();
      expect(scope.tasks).toEqual(tasks);
    });

    it('deletes tasks', function () {
      scope.deleteTask(0);
      expect(scope.tasks).toEqual([{name: 'Actually understand Angular', done: false}]);
    });

    it('counts the number of all the tasks', function () {
      expect(scope.numberOfTasks()).toEqual(2);
    });
  });
});
