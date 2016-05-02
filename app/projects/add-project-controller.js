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
        function ($scope, projectsGetter, authentication) {

            $scope.generateKey = function (name) {
                var key = [];
                name.split(/\s/).forEach(function (el) {
                    key.push(el[0])
                });
                $scope.project.ProjectKey = key.join('');
            };

            $scope.loadingUsers = authentication.getAllUsers()
                .then(function (response) {
                    $scope.users = response.data;
                    $scope.formatLead = function (model) {
                        for (var i = 0; i < $scope.users.length; i++) {
                            if (model === $scope.users[i].Id) {
                                return $scope.users[i].Username;
                            }
                        }
                    };
                }, function (error) {
                    console.log(error);
                });

            $scope.numberOfLabels = new Array(1);

            $scope.increaseLabels = function () {
                $scope.numberOfLabels.push("");
            };

            $scope.loadingLabels = function (input) {
                projectsGetter.getAllLabels(input)
                    .then(function (response) {
                        $scope.labels = response.data;
                        $scope.formatLabel = function (model) {
                            for (var i = 0; i < $scope.labels.length; i++) {
                                if (model === $scope.labels[i].Name) {
                                    return $scope.labels[i].Name;
                                }
                            }
                        };
                    });
            };

            // authentication.getAllUsers().then(function (response) {
            //     $scope.allUsers = response.data;
            //     console.log($scope.allUsers);
            // });

            $scope.addNewProject = function (projectData) {
                var collectedProjectData = projectData;
                console.log(collectedProjectData.labels);
                //$scope.projectData.ProjectKey = generateProjectKey(projectData.Name);
                //console.log($scope.projectData.ProjectKey);
                projectsGetter.addProject(collectedProjectData)
                    .then(function (projectData) {
                        console.log(projectData.data);
                        $scope.project = projectData.data;
                    })
            }

        }
    ]);
