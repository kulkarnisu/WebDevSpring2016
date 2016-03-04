/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope) {
        $scope.currentUser = $rootScope.currentUser;
        $scope.logOut = logOut();

        function logOut() {
            delete $rootScope.currentUser;
        }
    }
})();

