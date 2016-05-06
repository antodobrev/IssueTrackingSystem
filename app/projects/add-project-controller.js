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
        'authentication',
        'notifyService',
        '$location',
        'labelSeeder',
        'projectKeyGenerator',
        'userTypeaheadLoader',
        function ($scope, projectsGetter, authentication,
                  notifyService, $location, labelSeeder, projectKeyGenerator, userTypeaheadLoader) {

            projectKeyGenerator.seedProjectKeyGenerator($scope);

            userTypeaheadLoader.seedLoader($scope);

            labelSeeder.seedLabels($scope);

            $scope.addNewProject = function (projectData) {
                var collectedProjectData = projectData;
                console.log(collectedProjectData);
                //$scope.projectData.ProjectKey = generateProjectKey(projectData.Name);
                //console.log($scope.projectData.ProjectKey);
                projectsGetter.addProject(collectedProjectData)
                    .then(function (projectData) {
                        console.log(projectData.data);
                        notifyService.waveMessage('Project added successfully', 'success');
                        $location.path('/project/' + projectData.data.Id);
                    }, function (error) {
                        notifyService.showError(error.data);
                    })
            }

        }
    ]);
