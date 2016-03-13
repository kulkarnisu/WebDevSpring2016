/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService, $location) {
        $scope.login = login;

        function login(user) {
            UserService.findUserByUsernameAndPassword(user.username, user.password, isUserPresent);
        }

        function isUserPresent(userFound) {
            if(userFound) {
                $rootScope.currentUser = userFound;
                $location.url("/profile");
            }
        }
    }
})();