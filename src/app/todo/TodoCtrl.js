
angular
  .module('famcentric.todo')
  .controller('TodoCtrl', function ($scope, Restangular, $log) {
    'use strict';
    var Todo = Restangular.all('todo');
    Todo.getList()
      .then(function (todos) {
        $scope.todos = todos;
      })
      .catch(function (err) {
        $log.error(err);
      });

    $scope.add = function () {
      var todo = {label: $scope.label, isDone: false};
      $scope.posting = true;
      Todo.post(todo)
        .then(function (todo) {
          $scope.todos.push(todo);
          $scope.label = '';
        })
        .catch(function (err) {
          $log.error(err);
        })
        .finally(function () {
          $scope.posting = false;
        });
    };

    $scope.check = function () {
      this.todo.isDone = !this.todo.isDone;
      this.todo.put().catch(function (err) {
        $log.error(err);
      });
    };
  });
