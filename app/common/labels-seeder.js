'use strict';

angular.module('IssueTruck.LabelSeeder', [])
    .factory('labelSeeder', [
        'projectsGetter',
        function (projectsGetter) {

            function seedLabels($scope) {
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
            }
            
            return {
                seedLabels: seedLabels
            }
        }]);