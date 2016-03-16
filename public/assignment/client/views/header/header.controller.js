/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, UserService, $location) {

        var vm = this;

        vm.logout = logout;

        function logout() {

            UserService.logout().then(function(response) {

                UserService.setCurrentUser(null);
                $location.url("/home");
            });
        }
    }
})();

