describe('To Do List', function() {
  var taskInput = element(by.model('taskInput'));
  var addTaskButton = element(by.className('btn-primary'));
  var taskList =  element.all(by.css('li'));
  var totalCount = element(by.className('total'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('ToDoList');
  });

  it('shows the added task', function() {
    taskInput.sendKeys('Do my weekend challenege');
    addTaskButton.click();
    expect(taskList.get(0).getText()).toEqual('Do my weekend challenege');
  });

  it('shows the total number of tasks', function() {
    taskInput.sendKeys('Do my weekend challenege');
    addTaskButton.click();
    expect(totalCount.getText()).toEqual('Number of tasks: 1');
  });
});
