'use strict';

angular.module('IssueTruck.projects.AddProjectController', ['ngRoute', 'IssueTruck.projects.getter'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/add', {
            templateUrl: 'Projects/addProjectPage.html',
            controller: 'AddProjectController'
        });
    }])

    .controller('AddProjectController', [
        '$scope',
        'projectsGetter',
        function ($scope, projectsGetter) {
            var collectedProjectData = $scope.projectData;
            projectsGetter.addProject(collectedProjectData).then(function (projectData) {
                console.log(projectData.data);
                $scope.project = projectData.data;
            })
        }
    ]);
