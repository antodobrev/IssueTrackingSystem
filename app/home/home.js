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
        '$rootScope',
        '$location',
        'authentication',
        'notifyService',
        function ($scope, $rootScope, $location, authentication, notifyService) {

            $scope.login = function (userData) {
                authentication.loginUser(userData)
                    .then(function (response) {
                        $rootScope.user = response.userName;
                        notifyService.waveMessage('successfully logged in', 'success');
                        $location.path('/dashboard');
                    }, function (error) {
                        console.log(error.data);
                        notifyService.showError('login error', error.data)
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
                        console.log(error.data);
                        notifyService.showError('register error', error.data)
                    })
            };

            $rootScope.logout = function () {
                authentication.logout().then(function () {
                    notifyService.waveMessage('successfully logged out', 'success');
                    $location.path('/');
                });
            }
        }]);