'use strict';

angular.module('IssueTruck.users.passwordController', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile/password', {
            templateUrl: 'users/password.html',
            controller: 'PasswordController'
        });
    }])
    .controller('PasswordController', [
        '$scope',
        'authentication',
        function ($scope, authentication) {

            $scope.changePass = function (changePassData) {
                authentication.changePassword(changePassData).then(function (response) {
                    console.log(response);
                }, function (err) {
                    console.log(err);
                })
            }
        }
    ]);