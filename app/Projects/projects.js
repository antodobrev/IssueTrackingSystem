'use strict';

angular.module('IssueTruck.projects.getter', [])
    .factory('projectsGetter', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function getProjects() {
                var defered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                $http.get(BASE_URL + 'projects?filter=&pageSize=4&pageNumber=1').then(function (response) {
                    console.log(response.data);
                    defered.resolve(response);
                }, function (err) {
                    console.log(err);
                });

                return defered.promise;
            }

            return {
                getProjects: getProjects,
            }
        }
    ])