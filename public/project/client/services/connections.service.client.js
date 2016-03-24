/**
 * Created by TanmayPC on 3/1/2016.
 */
(function() {
    angular
        .module("ConnectionBuilderApp")
        .factory("ConnectionsService", ConnectionsService);

    function ConnectionsService() {

        var api = {
            createConnectionForUser: createConnectionForUser,

            findAllConnectionsForUser: findAllConnectionsForUser,

            deleteConnectionById: deleteConnectionById,

            updateConnectionById: updateConnectionById,

            findConnectionById: findConnectionById
        };
        return api;

        function createConnectionForUser(userID, connection) {

            var deferred = $q.defer();

            var url = "/api/project/user/:userId/connection";
            url = url.replace(":userId", userID);

            $http.post(url, connection).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findAllConnectionsForUser(userID) {

            var deferred = $q.defer();

            var url = "/api/project/user/:userId/connection";
            url = url.replace(":userId", userID);

            $http.get(url).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deleteConnectionById(connectionID) {

            var deferred = $q.defer();

            var url = "/api/project/connection/:connectionId";
            url = url.replace(":connectionId", connectionID);

            $http.delete(url).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function updateConnectionById(connectionID, newConnection) {

            var deferred = $q.defer();

            var url = "/api/project/connection/:connectionId";
            url = url.replace(":connectionId", connectionID);

            $http.put(url, newConnection).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }
        function findConnectionById(connectionID) {

            var deferred = $q.defer();

            var url = "/api/project/connection/:connectionId";
            url = url.replace(":connectionId", connectionID);

            $http.get(url).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }
        
    }
})();