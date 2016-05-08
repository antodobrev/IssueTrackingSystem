'use strict';

angular.module('IssueTruck.issues.issuePage', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issue/:id', {
            templateUrl: 'issues/issuePage.html',
            controller: 'IssuesController'
        });
    }])

    .controller('IssuesController', [
        '$scope',
        'issueService',
        '$routeParams',
        'notifyService',
        'labelSeeder',
        'userTypeaheadLoader',
        'projectsGetter',
        'authentication',
        function ($scope, issueService, $routeParams, notifyService,
                  labelSeeder, userTypeaheadLoader, projectsGetter, authentication) {

            issueService.getIssueById($routeParams.id).then(function (response) {
                console.log(response.data);
                $scope.issue = response.data;
                // check if is lead
                projectsGetter.getProjectById($scope.issue.Project.Id).then(function (projectData) {
                    $scope.project = projectData.data;
                    if ($scope.project.Lead.Id === sessionStorage.userId) {
                        $scope.isLead = true;
                    }
                    // check if admin
                    authentication.getLoggedInUser(sessionStorage.token).then(function (response) {
                        if (response.data.isAdmin) {
                            $scope.isAdmin = true;
                        }
                        if ($scope.isAdmin || $scope.isLead) {
                            $scope.canEdit = true;
                        }
                    });

                });

            });

            $scope.toggleEditIssue = function () {
                $('#issue-modal').modal('toggle');
                labelSeeder.seedLabels($scope);
                userTypeaheadLoader.seedLoader($scope);
                $scope.issue.Priorities = [];
                $scope.issue.Priorities.push($scope.issue.Priority);
                $scope.modalHeader = 'edit issue';
            };

            $scope.saveIssueData = function(newIssueData) {
                issueService.editIssue(newIssueData).then(function (response) {
                    console.log(response.data);
                    notifyService.waveMessage("issue updated successfully", "success");
                    issueService.getIssueById($routeParams.id).then(function (response) {
                        $scope.issue = response.data;
                    });
                    $('#issue-modal').modal('toggle');
                }, function (error) {
                    notifyService.showError('issue update error', error.data);
                    console.log(error.data);
                });
            };

            // change status

            $scope.toggleStatusModal = function () {
                if (sessionStorage.userId === $scope.issue.Assignee.Id) {
                    $('#change-status-modal').modal('toggle');
                }
                else {
                    notifyService.waveMessage("Only assignees can change the status", 'info')
                }
            };

            $scope.updateStatus = function (newStatusId) {
                issueService.editStatus($routeParams.id, newStatusId).then(function (response) {
                    notifyService.waveMessage('status changes successfully', 'success');

                    issueService.getIssueById($routeParams.id).then(function (response) {
                        $scope.issue = response.data;
                    });
                    $('#change-status-modal').modal('toggle');
                }, function (error) {
                    console.log(error);
                    notifyService.showError('invalid change attempt', error.data);
                })
            }
        }]);