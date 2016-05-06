'use strict';

angular.module('IssueTruck.ProjectKeyGenerator', [])
    .factory('projectKeyGenerator', [
        function () {

            function seedProjectKeyGenerator($scope) {
                $scope.project = {};

                $scope.generateKey = function (name) {
                    var key = [];
                    name.split(/\s/).forEach(function (el) {
                        key.push(el[0])
                    });
                    $scope.project.ProjectKey = key.join('');
                };
            }

            return {
                seedProjectKeyGenerator: seedProjectKeyGenerator
            }
        }]);