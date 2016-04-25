'use strict';

angular.module('IssueTruck.issues', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/issues', {
            templateUrl: 'issues/issues.html',
            controller: 'IssuesController'
        });
    }])

    .controller('IssuesController', [
        '$scope',
        function($scope, projectsGetter) {

        }]);