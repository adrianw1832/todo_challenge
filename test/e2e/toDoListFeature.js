describe('To Do List', function() {
  var taskInput = element(by.model('taskInput'));
  var editInput = element(by.model('task.name'));
  var addTaskButton = element(by.className('btn-default'));
  var deleteTaskButton = element.all(by.className('btn-danger'));
  var taskList =  element.all(by.css('li'));
  var totalCount = element(by.className('total'));
  var checkBox = element.all(by.model('task.done'));
  var allFilter = element(by.css('.all'));
  var activeFilter = element(by.css('.active'));
  var completedFilter = element(by.css('.completed'));
  var clearAll = element(by.css('.clear'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('ToDoList');
  });

  it('shows the added tasks with the all filter', function() {
    taskInput.sendKeys('Do my weekend challenege');
    addTaskButton.click();
    taskInput.sendKeys('Actually understand Angular');
    addTaskButton.click();
    allFilter.click();
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege');
    expect(taskList.get(1).getText()).toEqual('Actually understand Angular');
  });

  it('shows the active and completed tasks with the correct filter', function() {
    taskInput.sendKeys('Do my weekend challenege');
    addTaskButton.click();
    taskInput.sendKeys('Actually understand Angular');
    addTaskButton.click();
    checkBox.get(0).click();
    activeFilter.click();
    expect(taskList.get(0).getText()).toEqual('Actually understand Angular');
    completedFilter.click();
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege');
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
    expect(checkBox.get(0).isSelected()).toBe(false);
    checkBox.get(0).click();
    expect(checkBox.get(0).isSelected()).toBe(true);
  });

  it('allows the user to edit the task', function() {
    taskInput.sendKeys('Do my weekend challenege');
    addTaskButton.click();
    browser.actions().doubleClick(taskList.get(0)).perform();
    editInput.sendKeys(' quickly');
    editInput.sendKeys(protractor.Key.ENTER);
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege quickly');
  });

  it('does not allow the user to edit task to no description', function() {
    taskInput.sendKeys('Do my weekend challenege');
    addTaskButton.click();
    browser.actions().doubleClick(taskList.get(0)).perform();
    editInput.sendKeys('');
    editInput.sendKeys(protractor.Key.ENTER);
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege');
  });
});
