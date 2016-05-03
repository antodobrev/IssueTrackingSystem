'use strict';

angular.module('IssueTruck.issues.issuePage', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issue/:id', {
            templateUrl: 'issues/issuePage.html',
            controller: 'IssuesController'
        });
    }])

    .controller('IssuesController', [
        '$scope',
        function ($scope, projectsGetter) {

        }]);