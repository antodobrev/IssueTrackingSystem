'use strict';

angular.module('IssueTruck.projects.getter', [])
    .factory('projectsGetter', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function getProjectById(id) {
                var defered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                $http.get(BASE_URL + 'projects/' + id).then(function (response) {
                    defered.resolve(response);
                }, function (err) {
                    console.log(err);
                });

                return defered.promise;
            }

            function getProjects() {
                var defered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                $http.get(BASE_URL + 'projects?filter=&pageSize=4&pageNumber=1').then(function (response) {
                    defered.resolve(response);
                }, function (err) {
                    console.log(err);
                });

                return defered.promise;
            }

            function getProjectIssues(id) {
                var defered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                $http.get(BASE_URL + 'projects/' + id + '/issues').then(function (response) {
                    defered.resolve(response);
                }, function (err) {
                    console.log(err);
                });

                return defered.promise;
            }

            return {
                getProjects: getProjects,
                getProjectById:getProjectById,
                getProjectIssues: getProjectIssues
            }
        }
    ]);