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
        function ($scope, issueService, $routeParams, notifyService, labelSeeder, userTypeaheadLoader) {
            issueService.getIssueById($routeParams.id).then(function (response) {
                console.log(response.data);
                $scope.issue = response.data;
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
                console.log(newIssueData);
                issueService.editIssue(newIssueData).then(function (response) {
                    console.log(response.data);
                    notifyService.waveMessage("issue updated successfully", "success");
                    issueService.getIssueById($routeParams.id).then(function (response) {
                        console.log(response.data);
                        $scope.issue = response.data;
                    });
                    $('#issue-modal').modal('toggle');
                }, function (error) {
                    notifyService.showError('issue update error', error.data);
                });
            };

            // change status

            $scope.toggleStatusModal = function () {
                $('#change-status-modal').modal('toggle');
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