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
        function ($scope) {
            $scope.user = sessionStorage.User;
        }
    ]);