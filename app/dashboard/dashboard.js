'use strict';

angular.module('IssueTruck.dashboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardController'
        });
    }])

    .controller('DashboardController', [
        '$scope',
        'issueService',
        'projectsGetter',
        function ($scope, issueService, projectsGetter) {
            issueService.getMyIssues().then(function (issues) {
                console.log(issues.data);
                $scope.Issues = issues.data.Issues;
            });
            var leaderId = sessionStorage.userId;
            projectsGetter.getProjectsByLeaderId(leaderId).then(function (response) {
                console.log(response.data.Projects);
                $scope.projectsAsLead = response.data.Projects;
            })
        }]);