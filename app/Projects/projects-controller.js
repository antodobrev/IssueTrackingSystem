'use strict';

angular.module('IssueTruck.projects', ['ngRoute', 'IssueTruck.projects.getter'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'Projects/projects.html',
            controller: 'ProjectsController'
        });
        $routeProvider.when('/project/:id', {
            templateUrl: 'Projects/projectPage.html',
            controller: 'ProjectController'
        });
    }])

    .controller('ProjectController', [
        '$scope',
        'projectsGetter',
        '$routeParams',
        '$location',
        'authentication',
        'labelSeeder',
        'issueService',
        'userTypeaheadLoader',
        'notifyService',
        function ($scope, projectsGetter, $routeParams, $location,
                  authentication, labelSeeder, issueService, userTypeaheadLoader, notifyService) {

            var projectId = $routeParams.id;
            projectsGetter.getProjectById(projectId).then(function (projectData) {
                $scope.project = projectData.data;
                if ($scope.project.Lead.Id === sessionStorage.userId) {
                    $scope.isLead = true;
                }
                projectsGetter.getProjectIssues($scope.project.Id).then(function (issues) {
                    $scope.Issues = issues.data;
                })
            });

            $scope.goToIssuePage = function (issue) {
                $location.path('issue/' + issue.Id);
            };

            authentication.getLoggedInUser(sessionStorage.token).then(function (response) {
                if (response.data.isAdmin) {
                    $scope.isAdmin = true;
                }
            });

            $scope.addIssue = function(newIssueData) {
                newIssueData.ProjectId = $scope.project.Id;
                issueService.addIssue(newIssueData).then(function (response) {
                    console.log(response.data);
                    notifyService.waveMessage("issue added successfully", "success");
                    projectsGetter.getProjectIssues($scope.project.Id).then(function (issues) {
                        $scope.Issues = issues.data;
                    });
                    $('#add-issue-modal').modal('toggle');
                }, function (error) {
                    notifyService.showError(error.data);
                });
            };

            $scope.toggleModal = function () {
                $('#add-issue-modal').modal('toggle');
                labelSeeder.seedLabels($scope);
                userTypeaheadLoader.seedLoader($scope);
            }
        }
    ])

    .controller('ProjectsController', [
        '$scope',
        'projectsGetter',
        function($scope, projectsGetter) {
            projectsGetter.getProjects().then(function (projectsData) {
                $scope.projects = projectsData.data.Projects;
                $scope.projects.forEach(function (el) {
                    projectsGetter.getProjectIssues(el.Id).then(function (issues) {
                        console.log(issues.data);
                    })
                })
            });
            

            $scope.triggerGetProject = function(id) {
                projectsGetter.getProjectById(id).then(function (projectData) {
                    console.log(projectData);
                })
            };
    }]);