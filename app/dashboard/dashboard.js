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
            projectsGetter.getProjectsByLeaderId(leaderId).then(function (response) {
                $scope.projectsAsLead = response.data.Projects;
            });

            $scope.goToIssuePage = function (issue) {
                $location.path('issue/' + issue.Id);
            };

/*            issueService.getMyIssues().then(function (issues) {
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
            });*/

            issueService.getMyIssuesByFilter(1, 1).then(function (response) {
                $scope.bigTotalItems = response.data.TotalCount;
                issueService.getMyIssuesByFilter(response.data.TotalCount, 1).then(function (allIssues) {
                    $scope.relatedProjects = {};
                    allIssues.data.Issues.forEach(function (issue) {
                        projectsGetter.getProjectById(issue.Project.Id)
                            .then(function (response) {
                                if (!(response.data.Id in $scope.relatedProjects)) {
                                    $scope.relatedProjects[response.data.Id] = (response.data);
                                    $scope.reloadMyProjects(1)
                                }
                            });
                    });
                });

            }, function (error) {
                console.log(error);
            });

            $scope.reloadMyProjects = function(bigCurrentPage) {
                $scope.projectsTotalCount = Object.keys($scope.relatedProjects).length;
                console.log($scope.relatedProjects);
                var asArr = [];
                //debugger;
                for (var pr in $scope.relatedProjects) {
                    asArr.push($scope.relatedProjects[pr]);
                }
                $scope.projects = takeProjects(3, bigCurrentPage, asArr);
            };

            function takeProjects(pageSize, number, asArr) {
                var startIndex = (number - 1) * pageSize;
                return asArr.splice(startIndex, pageSize);
            }

            $scope.reloadMyIssues = function(bigCurrentPage) {

                issueService.getMyIssuesByFilter(3, bigCurrentPage).then(function (response) {
                    $scope.Issues = response.data.Issues;
                    $scope.bigTotalItems = response.data.TotalCount;
                    console.log(response.data);
                }, function (error) {
                    console.log(error);
                })
            };

            $scope.reloadMyIssues(1);

        }]);