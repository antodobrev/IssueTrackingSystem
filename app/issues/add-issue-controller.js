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
        'issueService',
        function ($scope, projectsGetter, $routeParams, authentication, issueService) {
            projectsGetter.getProjectById($routeParams.id)
                .then(function (response) {
                    $scope.project = response.data;
                }, function (error) {
                    console.log(error);
                });

            $scope.getPriority = function (priorityId) {
                console.log(priorityId);
                $scope.issue.priorityId = priorityId;
            };

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

            $scope.numberOfLabels = new Array(1);

            $scope.increaseLabels = function () {
                $scope.numberOfLabels.push("");
            };

            $scope.loadingLabels = function (input) {
                projectsGetter.getAllLabels(input)
                    .then(function (response) {
                        $scope.labels = response.data;
                        $scope.formatLabel = function (model) {
                            for (var i = 0; i < $scope.labels.length; i++) {
                                if (model === $scope.labels[i].Name) {
                                    return $scope.labels[i].Name;
                                }
                            }
                        };
                    });
            };
            
            $scope.addIssue = function (issueData) {
                issueData.ProjectId = $scope.project.Id;
                console.log(issueData);
                issueService.addIssue(issueData).then(function (response) {
                    console.log(response.data);
                })
            }
        }]);