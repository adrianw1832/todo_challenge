describe('To Do List', function() {
  var taskInput = element(by.model('taskInput'));
  var editInput = element.all(by.model('task.name'));
  var addTaskButton = element(by.className('btn-default'));
  var deleteTaskButton = element.all(by.className('btn-danger'));
  var taskList = element.all(by.css('li'));
  var totalCount = element(by.className('total'));
  var checkBox = element.all(by.model('task.done'));
  var allFilter = element(by.css('.all'));
  var activeFilter = element(by.css('.active'));
  var completedFilter = element(by.css('.completed'));
  var clearAll = element(by.css('.clear'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
    taskInput.sendKeys('Do my weekend challenege');
    addTaskButton.click();
    taskInput.sendKeys('Actually understand Angular');
    addTaskButton.click();
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('ToDoList');
  });

  it('shows the total number of tasks', function() {
    expect(totalCount.getText()).toEqual('Number of tasks: 2');
    taskInput.sendKeys('Finish Boris bike');
    addTaskButton.click();
    expect(totalCount.getText()).toEqual('Number of tasks: 3');
  });

  it('shows the added tasks with the all filter', function() {
    allFilter.click();
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege');
    expect(taskList.get(1).getText()).toEqual('Actually understand Angular');
  });

  it('deletes the right task', function() {
    deleteTaskButton.get(1).click();
    expect(totalCount.getText()).toEqual('Number of tasks: 1');
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege');
    expect(taskList.count()).toEqual(1);
  });

  it('each task has a checkbox', function() {
    expect(checkBox.get(0).isSelected()).toBe(false);
    checkBox.get(0).click();
    expect(checkBox.get(0).isSelected()).toBe(true);
  });

  it('allows the user to edit the task', function() {
    browser.actions().doubleClick(taskList.get(0)).perform();
    editInput.get(0).sendKeys(' quickly');
    editInput.get(0).sendKeys(protractor.Key.ENTER);
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege quickly');
  });

  it('does not allow the user to edit task to no description', function() {
    browser.actions().doubleClick(taskList.get(0)).perform();
    editInput.get(0).sendKeys('');
    editInput.get(0).sendKeys(protractor.Key.ENTER);
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege');
  });

  it('shows the active and completed tasks with the correct filter', function() {
    checkBox.get(0).click();
    activeFilter.click();
    expect(taskList.get(0).getText()).toEqual('Actually understand Angular');
    completedFilter.click();
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege');
  });

  it('allows the user to clear all completed task', function() {
    checkBox.get(0).click();
    checkBox.get(1).click();
    clearAll.click();
    expect(element(by.css('li')).isPresent()).toBe(false);
    expect(totalCount.getText()).toEqual('Number of tasks: 0');
  });
});
