angular.module('IssueTruck.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function registerUser(regUserData) {
                var deferred = $q.defer();

                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };

                var data = 'confirmpassword=' + regUserData.Confirm
                    + '&email=' + regUserData.Username
                    + '&password=' + regUserData.Password;

                $http.post(BASE_URL + 'api/Account/Register', data, config)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {

                    });

                return deferred.promise;
            }

            function getLoggedInUser(data) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;

                    $http.get('http://softuni-issue-tracker.azurewebsites.net/users/me')
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            function loginUser(userData) {
                var deferred = $q.defer();

                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };
                var data = 'grant_type=password&username='
                    + userData.Username
                    + '&password='
                    + userData.Password;

                $http.post(BASE_URL + 'api/Token', data, config)
                    .then(function(response) {
                        sessionStorage.User = response.data.userName;
                        sessionStorage.token = response.data.access_token;
                        var loggedUserData = {};
                        getLoggedInUser(response.data).then(function (logedInResponse) {
                            loggedUserData = logedInResponse.data;
                            sessionStorage.userId = loggedUserData.Id;
                            deferred.resolve(loggedUserData.data);
                        });

                    }, function() {

                    });

                return deferred.promise;
            }

            function logout() {

            }

            function isLoggedIn() {
                return sessionStorage['User'];
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout,
                isLoggedIn: isLoggedIn
            }
        }]);