'use strict';

angular.module('IssueTruck', [
        'ngRoute',
        'ngCookies',
        'IssueTruck.home',
        'IssueTruck.users.authentication',
        'IssueTruck.users.userController',
        'IssueTruck.dashboard',
        'IssueTruck.projects',
        'IssueTruck.issues',
        'myApp.version'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(function ($rootScope, $location, authentication) {
        $rootScope.$on('$locationChangeStart', function (event) {
            if (!authentication.isLoggedIn()) {
                $location.path("/");
            }
        })
    })
    .constant('BASE_URL', "http://softuni-issue-tracker.azurewebsites.net/");

