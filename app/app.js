'use strict';

angular.module('IssueTruck', [
        'ngRoute',
        'ngCookies',
        'IssueTruck.home',
        'IssueTruck.notyService',
        'IssueTruck.LabelSeeder',
        'IssueTruck.ProjectKeyGenerator',
        'IssueTruck.UserTypeaheadLoader',
        'IssueTruck.common.datepicker',
        'IssueTruck.users.authentication',
        'IssueTruck.users.userController',
        'IssueTruck.users.passwordController',
        'IssueTruck.dashboard',
        'IssueTruck.projects',
        'IssueTruck.projects.AddProjectController',
        'IssueTruck.projects.EditProjectController',
        'IssueTruck.issues',
        'IssueTruck.issues.issuePage',
        'myApp.version',
        'ui.bootstrap'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(function ($rootScope, $location, authentication) {
        $rootScope.$on('$locationChangeStart', function (event) {
            if (!authentication.isLoggedIn()) {
                $location.path("/");
            }
        });
        $rootScope.user = $rootScope.user || sessionStorage.User;
    })
    .constant('BASE_URL', "http://softuni-issue-tracker.azurewebsites.net/");

