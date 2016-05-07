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

            $scope.saveIssueData = function(newIssueData) {
                newIssueData.ProjectId = $scope.project.Id;
                issueService.addIssue(newIssueData).then(function (response) {
                    console.log(response.data);
                    notifyService.waveMessage("issue added successfully", "success");
                    projectsGetter.getProjectIssues($scope.project.Id).then(function (issues) {
                        $scope.Issues = issues.data;
                    });
                    $('#issue-modal').modal('toggle');
                }, function (error) {
                    notifyService.showError(error.data);
                });
            };

            $scope.toggleModal = function () {
                $('#issue-modal').modal('toggle');
                $scope.issue = {};
                $scope.issue.Priorities = $scope.project.Priorities;
                $scope.modalHeader = 'add new issue';
                labelSeeder.seedLabels($scope);
                userTypeaheadLoader.seedLoader($scope);
            }
        }
    ])

    .controller('ProjectsController', [
        '$scope',
        'projectsGetter',
        function($scope, projectsGetter) {
       /*     projectsGetter.getProjects().then(function (projectsData) {
                $scope.projects = projectsData.data;
                console.log(projectsData.data.length);
                $scope.bigTotalItems = projectsData.data.TotalCount;
                $scope.bigCurrentPage = 1;

                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                    console.log(pageNo);
                };
            });*/


            
            $scope.reloadProjects = function (bigCurrentPage) {
                console.log(bigCurrentPage);
                projectsGetter.getProjectsByFilter(5, bigCurrentPage).then(function (response) {
                    $scope.projects = response.data.Projects;
                    $scope.bigTotalItems = response.data.TotalCount;
                    console.log(response.data);
                }, function (error) {
                    console.log(error);
                })
            };

            $scope.reloadProjects(1);

            $scope.triggerGetProject = function(id) {
                projectsGetter.getProjectById(id).then(function (projectData) {
                    console.log(projectData);
                })
            };
    }]);