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
        '$location',
        'notifyService',
        function ($scope, authentication, $location, notifyService) {

            $scope.changePass = function (changePassData) {
                authentication.changePassword(changePassData).then(function (response) {
                    console.log(response);
                    notifyService.waveMessage('passoword changed successfully', 'success');
                    $location.path('/profile');
                }, function (err) {
                    console.log(err);
                    notifyService.showError('error', err.data);
                })
            }
        }
    ]);