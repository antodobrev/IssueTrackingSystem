'use strict';

angular.module('IssueTruck.users.userController', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'users/profile.html',
            controller: 'UserController'
        });
    }])
    .controller('UserController', [
        '$scope',
        'authentication',
        function ($scope, authentication) {
            $scope.user = sessionStorage.User;
            authentication.getLoggedInUser(sessionStorage.token).then(function (response) {
                if (response.data.isAdmin) {
                     $scope.isAdmin = true;
                }
            })
        }
    ]);