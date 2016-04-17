angular.module('IssueTruck.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Users/Register', user)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {

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

                $http.post(BASE_URL + 'Token', data, config)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function() {

                    });

                return deferred.promise;
            }

            function logout() {

            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout
            }
        }]);