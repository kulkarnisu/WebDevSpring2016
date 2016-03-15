/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService, $location) {

        $scope.user= {};

        $scope.user.username = $rootScope.currentUser.username;
        $scope.user.password = $rootScope.currentUser.password;
        $scope.user.email = $rootScope.currentUser.email;
        $scope.user.firstName = $rootScope.currentUser.firstName;
        $scope.user.lastName = $rootScope.currentUser.lastName;

        $scope.update = update;

        function update(user) {

            UserService.updateUser($rootScope.currentUser._id, user).then(updateProfilePage);
        }

        function updateProfilePage(response) {

            if (response === "OK") {

                UserService.findUserById($rootScope.currentUser._id).then (function (updatedUser) {

                    $scope.user.username = updatedUser.username;
                    $scope.user.firstName = updatedUser.firstName;
                    $scope.user.lastName = updatedUser.lastName;
                    $scope.user.email = updatedUser.email;
                });
            }
        }
    }
})();