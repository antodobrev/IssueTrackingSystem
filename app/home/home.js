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
        '$location',
        'authentication',
        function ($scope, $location, authentication) {

            $scope.login = function (userData) {
                authentication.loginUser(userData)
                    .then(function (response) {
                        console.log(response);
                        $location.path('/dashboard');
                    }, function (error) {
                        console.log(error);
                    })
            };

            $scope.register = function (regUserData) {
                authentication.registerUser(regUserData)
                    .then(function (response) {
                        console.log(response);
                        var userData = {};
                        userData.Password = regUserData.Password;
                        userData.Username = regUserData.Email;
                        console.log(userData);
                        authentication.loginUser(userData)
                    }, function (error) {
                        console.log(error);
                    })
            }
        }]);