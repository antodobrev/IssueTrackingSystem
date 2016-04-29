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
        $routeProvider.when('/project/:id/edit', {
            templateUrl: 'Projects/editProjectPage.html',
            controller: 'EditProjectController'
        });
    }])

    .controller('EditProjectController', [
        '$scope',
        'projectsGetter',
        '$routeParams',
        function ($scope, projectsGetter, $routeParams) {
            var projectId = $routeParams.id;
            projectsGetter.getProjectById(projectId).then(function (projectData) {
                console.log(projectData.data);
                $scope.project = projectData.data;
            })
        }
    ])

    .controller('ProjectController', [
        '$scope',
        'projectsGetter',
        '$routeParams',
        function ($scope, projectsGetter, $routeParams) {
            var projectId = $routeParams.id;
            projectsGetter.getProjectById(projectId).then(function (projectData) {
                console.log(projectData.data);
                $scope.project = projectData.data;
                projectsGetter.getProjectIssues($scope.project.Id).then(function (issues) {
                    console.log(issues.data);
                    $scope.project.Issues = issues.data;
                })
            })
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
            }
    }]);