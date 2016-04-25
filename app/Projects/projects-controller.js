'use strict';

angular.module('IssueTruck.projects', ['ngRoute', 'IssueTruck.projects.getter'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'Projects/projects.html',
            controller: 'ProjectController'
        });
    }])

    .controller('ProjectController', [
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