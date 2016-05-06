'use strict';

angular.module('IssueTruck.UserTypeaheadLoader', [])
    .factory('userTypeaheadLoader', [
        'authentication',
        function (authentication) {

            function seedLoader($scope) {
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
            }

            return {
                seedLoader: seedLoader
            }
        }]);