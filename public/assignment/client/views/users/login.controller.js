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
            UserService.findUserByCredentials(user.username, user.password).then(isUserPresent);
        }

        function isUserPresent(userFound) {

            console.log(userFound);

            if(userFound) {

                $rootScope.currentUser = userFound;
                $location.url("/profile");
            }
        }
    }
})();