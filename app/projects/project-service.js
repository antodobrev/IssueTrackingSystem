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

            function getProjectsByLeaderId(leaderId) {
                var defered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                $http.get(BASE_URL + 'projects?filter=Lead.Id="' + leaderId
                    + '"&pageSize=4&pageNumber=1'
                ).then(function (response) {
                    defered.resolve(response);
                }, function (err) {
                    console.log(err);
                });

                return defered.promise;
            }

            function getProjects() {
                var defered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                $http.get(BASE_URL + 'projects').then(function (response) {
                    defered.resolve(response);
                }, function (err) {
                    console.log(err);
                });

                return defered.promise;
            }

            function getProjectsByFilter(pageSize, pageNumber) {
                var defered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                var urlTopass = BASE_URL + 'projects?filter=&'
                + 'pageSize=' + pageSize
                + '&pageNumber=' + pageNumber;

                $http.get(urlTopass).then(function (response) {
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

            function getAllLabels(input) {
                var defered = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                $http.get(BASE_URL + 'labels/?filter=' + input).then(function (response) {
                    defered.resolve(response);
                }, function (err) {
                    console.log(err);
                });

                return defered.promise;
            }

            function addProject(projectData) {
                var defered = $q.defer();

                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                var data = 'name='
                    + projectData.Name
                    + '&description='
                    + projectData.Description
                    + '&projectKey='
                    + projectData.ProjectKey
                    + '&leadId='
                    + projectData.leadId;

                var counter = 0;
                for (var label in projectData.labels) {
                    data += '&labels[' + counter + '].Name=' + projectData.labels[label];
                    counter++;
                }
                var priorities = projectData.priorities.split( /,\s/);
                counter = 0;
                priorities.forEach(function (p) {
                    data += '&priorities[' + counter + '].Name=' + p;
                    counter++;
                });
                
                console.log(data);
                $http.post(BASE_URL + 'projects', data, config).then(function (response) {
                    defered.resolve(response);
                }, function (err) {
                    console.log(err);
                });

                return defered.promise;
            }

            function editProject(newData) {
                var defered = $q.defer();

                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                var data = 'name='
                    + newData.Name
                    + '&description='
                    + newData.Description
                    + '&leadId='
                    + newData.leadId;

                var counter = 0;
                for (var label in newData.labels) {
                    data += '&labels[' + counter + '].Name=' + newData.labels[label];
                    counter++;
                }
                var priorities = newData.priorities.split( /,\s/);
                counter = 0;
                priorities.forEach(function (p) {
                    data += '&priorities[' + counter + '].Name=' + p;
                    counter++;
                });

                console.log(data);
                var urlTopass = BASE_URL + 'projects/' + newData.Id;
                $http.put(urlTopass, data, config).then(function (response) {
                    defered.resolve(response);
                }, function (err) {
                    console.log(err);
                });

                return defered.promise;
            }

            return {
                getProjects: getProjects,
                getProjectById: getProjectById,
                getProjectIssues: getProjectIssues,
                getProjectsByLeaderId: getProjectsByLeaderId,
                addProject: addProject,
                getAllLabels: getAllLabels,
                editProject: editProject,
                getProjectsByFilter: getProjectsByFilter
            }
        }
    ]);