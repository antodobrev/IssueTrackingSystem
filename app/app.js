'use strict';

angular.module('IssueTruck', [
  'ngRoute',
  'IssueTruck.home',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
