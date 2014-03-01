
angular.module('famcentric', [
  'ngRoute',
  'famcentric.todo',
  'restangular','famcentricTemplates'
])
.config(function ($routeProvider, RestangularProvider) {
  'use strict';
  $routeProvider
    .when('/todo', {
      controller: 'TodoCtrl',
      templateUrl: '/famcentric/todo/todo.html'
    })
    .otherwise({
      redirectTo: '/todo'
    });

  RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setRestangularFields({
    id: '_id'
  });
});
