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
                console.log(projectsData.data.Projects);
                $scope.projects = projectsData.data.Projects;
            });
    }]);