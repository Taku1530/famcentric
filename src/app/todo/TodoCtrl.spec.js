/* jshint strict:false, globalstrict:false */
/* global describe, it, beforeEach, inject, module, should */

describe('TodoCtrl', function () {
  var todos = [{label: 'One', isDone: false}, {label: 'Two', isDone: true}],
      $httpBackend,
      todoCtrl,
      scope;

  beforeEach(module('famcentric'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/api/todo').respond(todos);
    
    scope = $injector.get('$rootScope');

    todoCtrl = function () {
      return $injector.get('$controller')('TodoCtrl', {'$scope': scope});
    };
  }));

  it('should get all todos from /api/todo on load', function () {
    todoCtrl();
    should.not.exist(scope.todos);
    $httpBackend.flush();
    scope.todos.length.should.equal(2);
  });

  it('should add new todos on add()', function () {
    var todo = {label: 'A new todo', _id: 'abc123', isDone: false};
    todoCtrl();
    $httpBackend.flush();
    $httpBackend.when('POST', '/api/todo').respond(todo);
    scope.label = todo.label;
    scope.add();
    scope.posting.should.equal(true);
    $httpBackend.flush();
    scope.posting.should.equal(false);
    scope.label.length.should.equal(0);
    scope.todos.length.should.equal(3);
    scope.todos[scope.todos.length - 1]._id.should.equal('abc123');
    scope.todos[scope.todos.length - 1].label.should.equal(todo.label);
    scope.todos[scope.todos.length - 1].isDone.should.equal(false);
  });
});
