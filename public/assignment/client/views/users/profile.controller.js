/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService, $location) {

        var vm = this;

        vm.update = update;

        vm.user= {};

        vm.user.username = $rootScope.currentUser.username;
        vm.user.password = $rootScope.currentUser.password;
        vm.user.email = $rootScope.currentUser.email;
        vm.user.firstName = $rootScope.currentUser.firstName;
        vm.user.lastName = $rootScope.currentUser.lastName;

        vm.update = update;

        function update(user) {

            UserService.updateUser($rootScope.currentUser._id, user).then(updateProfilePage);
        }

        function updateProfilePage(response) {

            if (response === "OK") {

                UserService.findUserById($rootScope.currentUser._id).then (function (updatedUser) {

                    vm.user.username = updatedUser.username;
                    vm.user.firstName = updatedUser.firstName;
                    vm.user.lastName = updatedUser.lastName;
                    vm.user.email = updatedUser.email;

                    $rootScope.currentUser = updatedUser;
                });
            }
        }
    }
})();