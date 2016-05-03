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

            var leaderId = sessionStorage.userId;
            console.log(leaderId);
            projectsGetter.getProjectsByLeaderId(leaderId).then(function (response) {
                $scope.projectsAsLead = response.data.Projects;
                console.log($scope.projectsAsLead);
            });

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