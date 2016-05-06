'use strict';

angular.module('IssueTruck.issues.editIssuePage', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issue/:id', {
            templateUrl: 'issues/edit-issuePage.html',
            controller: 'EditIssueController'
        });
    }])

    .controller('EditIssueController', [
        '$scope',
        'issueService',
        '$routeParams',
        'notifyService',
        function ($scope, issueService, $routeParams, notifyService) {

        }]);