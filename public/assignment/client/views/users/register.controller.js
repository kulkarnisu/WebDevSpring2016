/**
 * Created by sudeep on 2/19/16.
 */
//"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $location) {

        var vm = this;

        vm.register = register;

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
