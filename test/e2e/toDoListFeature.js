describe('To Do List', function() {
  var taskInput = element(by.model('taskInput'));
  var addTaskButton = element(by.className('btn-primary'));
  var deleteTaskButton = element.all(by.className('btn-danger'));
  var taskList =  element.all(by.css('li'));
  var totalCount = element(by.className('total'));
  var checkBox = element(by.model('task.done'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('ToDoList');
  });

  it('shows the added tasks', function() {
    taskInput.sendKeys('Do my weekend challenege');
    addTaskButton.click();
    taskInput.sendKeys('Actually understand Angular');
    addTaskButton.click();
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege');
    expect(taskList.get(1).getText()).toEqual('Actually understand Angular');
  });

  it('shows the total number of tasks', function() {
    expect(totalCount.getText()).toEqual('Number of tasks: 0');
    taskInput.sendKeys('Do my weekend challenege');
    addTaskButton.click();
    expect(totalCount.getText()).toEqual('Number of tasks: 1');
  });

  it('deletes the right task', function() {
    taskInput.sendKeys('Do my weekend challenege');
    addTaskButton.click();
    taskInput.sendKeys('Actually understand Angular');
    addTaskButton.click();
    deleteTaskButton.get(1).click();
    expect(totalCount.getText()).toEqual('Number of tasks: 1');
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege');
    expect(taskList.count()).toEqual(1);
  });

  it('each task has a checkbox', function() {
    taskInput.sendKeys('Do my weekend challenege');
    addTaskButton.click();
    expect(checkBox.isSelected()).toBeFalsy();
    checkBox.click();
    expect(checkBox.isSelected()).toBeTruthy();
  });
});
