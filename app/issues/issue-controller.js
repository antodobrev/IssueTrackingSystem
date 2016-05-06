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
        function ($scope, issueService, $routeParams) {
            issueService.getIssueById($routeParams.id).then(function (response) {
                console.log(response.data);
                $scope.issue = response.data;
            })
        }]);