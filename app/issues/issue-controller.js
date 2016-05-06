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
        function ($scope, issueService, $routeParams, notifyService) {
            issueService.getIssueById($routeParams.id).then(function (response) {
                console.log(response.data);
                $scope.issue = response.data;
            });

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