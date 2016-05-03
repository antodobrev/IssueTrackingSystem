angular.module('IssueTruck.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        '$rootScope',
        function ($http, $q, BASE_URL, $rootScope) {

            function registerUser(regUserData) {
                var deferred = $q.defer();

                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };

                var data = 'confirmpassword=' + regUserData.Confirm
                    + '&email=' + regUserData.Username
                    + '&password=' + regUserData.Password;

                $http.post(BASE_URL + 'api/Account/Register', data, config)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getLoggedInUser(token) {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + token;

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
                    .then(function (response) {
                        sessionStorage.User = response.data.userName;
                        sessionStorage.token = response.data.access_token;
                        var loggedUserData = {};
                        deferred.resolve(response.data);
                        getLoggedInUser(response.data.access_token).then(function (logedInResponse) {
                            loggedUserData = logedInResponse.data;
                            sessionStorage.userId = loggedUserData.Id;
                            deferred.resolve(loggedUserData.data);
                        });

                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function changePassword(userData) {
                var deferred = $q.defer();

                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;
                
                var data = 'oldPassword='
                    + userData.oldPassword
                    + '&newPassword='
                    + userData.newPassword
                    + '&confirmPassword='
                    + userData.confirmPassowrd;
                console.log(data);
                $http.post(BASE_URL + 'api/Account/ChangePassword', data, config)
                    .then(function (response) {
                        console.log(response);

                    }, function () {

                    });

                return deferred.promise;
            }

            function getAllUsers() {
                var deferred = $q.defer();

                $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.token;

                $http.get(BASE_URL + 'users/')
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            function logout() {
                var deffered = $q.defer();
                deffered.resolve(sessionStorage.clear());
                deffered.resolve($rootScope.user = undefined);
                return deffered.promise;
            }

            function isLoggedIn() {
                return sessionStorage['User'];
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout,
                isLoggedIn: isLoggedIn,
                getLoggedInUser: getLoggedInUser,
                changePassword: changePassword,
                getAllUsers: getAllUsers
            }
        }]);