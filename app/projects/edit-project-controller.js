'use strict';

angular.module('IssueTruck.projects.EditProjectController', ['ngRoute', 'IssueTruck.projects.getter'])

    .config(['$routeProvider', function ($routeProvider) {
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
    ]);