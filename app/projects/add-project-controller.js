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
                name.split(/\s/).forEach(function(el) { 
                    key.push(el[0])
                });
                $scope.projectData.ProjectKey = key.join('');
            };

            $scope.loadingUsers = authentication.getAllUsers()
                .then(function (response) {
                    $scope.users = response.data;
                    $scope.formatLead = function (model) {
                        debugger;
                        for (var i = 0; i < $scope.users.length; i++) {
                            if (model === $scope.users[i].Id) {
                                return $scope.users[i].Username;
                            }
                        }
                    };
                }, function (error) {
                    console.log(error);
                });

           // authentication.getAllUsers().then(function (response) {
           //     $scope.allUsers = response.data;
           //     console.log($scope.allUsers);
           // });

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
