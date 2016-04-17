'use strict';

angular.module('IssueTruck', [
        'ngRoute',
        'IssueTruck.home',
        'IssueTruck.users.authentication',
        'myApp.view2',
        'myApp.version'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', "http://softuni-issue-tracker.azurewebsites.net/api/");
