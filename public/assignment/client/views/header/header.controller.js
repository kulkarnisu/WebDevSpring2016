/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope) {

        var vm = this;

        vm.logout = logout;

        function logout() {
            delete $rootScope.currentUser;
        }
    }
})();

