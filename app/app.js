'use strict';

angular.module('IssueTruck', [
        'ngRoute',
        'ngCookies',
        'IssueTruck.home',
        'IssueTruck.users.authentication',
        'IssueTruck.dashboard',
        'myApp.version'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(function () {

    })
    .constant('BASE_URL', "http://softuni-issue-tracker.azurewebsites.net/api/");

