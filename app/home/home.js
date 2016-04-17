'use strict';

angular.module(
    'IssueTruck.home', ['ngRoute', 'IssueTruck.users.authentication'])

    .config([
        '$routeProvider',

        function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'home/home.html',
                controller: 'HomeController'
            });
        }])

    .controller('HomeController', [
        '$scope',
        'authentication',
        function ($scope, authentication) {

            $scope.login = function (userData) {
                authentication.loginUser(userData)
                    .then(function (response) {
                        console.log(response);
                    }, function (error) {
                        console.log(error);
                    })
            };

            $scope.register = function (username) {
                console.log(username);
            }
        }]);