'use strict';

angular.module('IssueTruck.issues.AddIssueController', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/project/:id/add-issue', {
            templateUrl: 'issues/add-issue.html',
            controller: 'AddIssueController'
        });
    }])

    .controller('AddIssueController', [
        '$scope',
        'projectsGetter',
        '$routeParams',
        'authentication',
        function ($scope, projectsGetter, $routeParams, authentication) {
            projectsGetter.getProjectById($routeParams.id)
                .then(function (response) {
                    $scope.project = response.data;
                    console.log(response.data);
                }, function (error) {
                    console.log(error);
                });

            $scope.loadingUsers = authentication.getAllUsers()
                .then(function (response) {
                    $scope.users = response.data;
                    $scope.formatLead = function (model) {
                        for (var i = 0; i < $scope.users.length; i++) {
                            if (model === $scope.users[i].Id) {
                                return $scope.users[i].Username;
                            }
                        }
                    };
                }, function (error) {
                    console.log(error);
                });
        }]);