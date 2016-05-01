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

            $scope.generateKey = function (name) {
                var key = [];
                name.split(/\s/).forEach(function(el) { 
                    key.push(el[0])
                });
                $scope.projectData.ProjectKey = key.join('');
            }

            $scope.addNewProject = function (projectData) {
                var collectedProjectData = projectData;
                console.log(collectedProjectData);
                $scope.projectData.ProjectKey = generateProjectKey(projectData.Name);
                console.log($scope.projectData.ProjectKey);
                //projectsGetter.addProject(collectedProjectData).then(function (projectData) {
              //      console.log(projectData.data);
               //     $scope.project = projectData.data;
               // })
            }

        }
    ]);
