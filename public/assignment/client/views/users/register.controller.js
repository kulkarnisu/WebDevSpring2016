/**
 * Created by sudeep on 2/19/16.
 */
//"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location) {

        $scope.register = register;

        function register(user) {

            UserService.createUser(user).then(function(users) {

                UserService.findUserByUsername(user.username).then(function (newUser) {

                    $rootScope.currentUser = newUser;
                    $location.url("/profile");
                });
            });
        }
    }
})();
