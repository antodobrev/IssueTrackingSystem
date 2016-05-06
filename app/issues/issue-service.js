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

            function getIssueById(issueId) {
                var defered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                $http.get(BASE_URL + 'issues/' + issueId)
                    .then(function (response) {
                        defered.resolve(response);
                    }, function (err) {
                        console.log(err);
                    });

                return defered.promise;
            }

            function addIssue(issueData) {
                var defered = $q.defer();

                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                var data = 'title='
                    + issueData.Title
                    + '&description='
                    + issueData.Description
                    + '&dueDate='
                    + issueData.DueDate
                    + '&projectId='
                    + issueData.ProjectId
                    + '&assigneeId='
                    + issueData.AssigneeId
                    + '&priorityId='
                    + issueData.priorityId;

                var counter = 0;
                for (var label in issueData.labels) {
                    data += '&labels[' + counter + '].Name=' + issueData.labels[label];
                    counter++;
                }

                console.log(data);
                $http.post(BASE_URL + 'issues', data, config).then(function (response) {
                    defered.resolve(response);
                }, function (err) {
                    console.log(err);
                });

                return defered.promise;
            }

            function editStatus(issueId, newStatusId) {
                var defered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                $http.put(BASE_URL + 'issues/' + issueId + '/changestatus?statusid=' + newStatusId)
                    .then(function (response) {
                        defered.resolve(response);
                    }, function (err) {
                        console.log(err);
                    });

                return defered.promise;
            }

            return {
                getMyIssues: getMyIssues,
                addIssue: addIssue,
                getIssueById: getIssueById,
                editStatus: editStatus
            }
        }
    ]);