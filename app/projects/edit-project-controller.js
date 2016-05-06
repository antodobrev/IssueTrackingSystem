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
        'labelSeeder',
        'projectKeyGenerator',
        'userTypeaheadLoader',
        'notifyService',
        '$location',
        'authentication',
        function ($scope, projectsGetter, $routeParams,
                  labelSeeder, projectKeyGenerator,
                  userTypeaheadLoader, notifyService, $location, authentication) {

            authentication.getLoggedInUser(sessionStorage.token).then(function (response) {
                if (response.data.isAdmin) {
                    $scope.isAdmin = true;
                }
                $scope.userId = response.data.Id;
                projectsGetter.getProjectById($routeParams.id).then(function (projectData) {
                    $scope.project = projectData.data;
                    if (!$scope.isAdmin || $scope.project.Lead.Id !== $scope.userId) {
                        $location.path('#/dashboard');
                    }
                });
            });

            labelSeeder.seedLabels($scope);

            projectKeyGenerator.seedProjectKeyGenerator($scope);

            userTypeaheadLoader.seedLoader($scope);



            $scope.updateProject = function (projectData) {
                //debugger;
                var collectedProjectData = projectData;
                console.log(collectedProjectData);

                projectsGetter.editProject(collectedProjectData)
                    .then(function (projectData) {
                        console.log(projectData.data);
                        notifyService.waveMessage('Project updated successfully', 'success');
                        $location.path('/project/' + projectData.data.Id);
                    }, function (error) {
                        notifyService.showError(error.data);
                    })
            }
        }
    ]);