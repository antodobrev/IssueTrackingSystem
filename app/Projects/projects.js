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
                priorities.forEach(function (p) {
                    data += '&priorities[' + counter + '].Name=' + p;
                });
                
                console.log(data);
                $http.post(BASE_URL + 'projects', data, config).then(function (response) {
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
                getAllLabels: getAllLabels
            }
        }
    ]);