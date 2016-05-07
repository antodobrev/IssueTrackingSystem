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
        '$location',
        function ($scope, issueService, projectsGetter, $location) {

            var leaderId = sessionStorage.userId;
            console.log(leaderId);
            projectsGetter.getProjectsByLeaderId(leaderId).then(function (response) {
                $scope.projectsAsLead = response.data.Projects;
                console.log($scope.projectsAsLead);
            });

            $scope.goToIssuePage = function (issue) {
                $location.path('issue/' + issue.Id);
            };

            issueService.getMyIssues().then(function (issues) {
                console.log(issues.data.Issues);
                $scope.Issues = issues.data.Issues;
                var assignedIssues = [];
                $scope.Issues.forEach(function (issue) {
                    projectsGetter.getProjectById(issue.Project.Id)
                        .then(function (response) {
                            $scope.projects.push(response.data);
                        })
                });
                $scope.projects = assignedIssues;
                console.log($scope.assignedIssues);
            });


        }]);