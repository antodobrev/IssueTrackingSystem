'use strict';

angular.module('IssueTruck.issues', [])
    .factory('issueService', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function getMyIssues() {
                var defered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                $http.get(BASE_URL + 'issues/me?orderBy=Project.Name desc, IssueKey&pageSize=2&pageNumber=1')
                    .then(function (response) {
                        defered.resolve(response);
                    }, function (err) {
                        console.log(err);
                    });

                return defered.promise;
            }

            return {
                getMyIssues: getMyIssues,
            }
        }
    ]);