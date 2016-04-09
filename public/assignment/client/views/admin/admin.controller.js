/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var vm = this;

        vm.addUser = addUser;
        vm.removeUser = removeUser;

        (function init() {
            
            vm.users = {};
            
            UserService.findAllUsers()

                .then(

                    function (users) {

                        vm.users = users;

                    }
                );

        })();
        
        function addUser(user) {

            UserService.createUser(user)

                .then(

                    function (response) {

                        var normalUsers = [];

                        for(var i in response) {
                            if(response[i].roles.indexOf("admin") === -1) {
                                normalUsers.push(response[i]);
                            }
                        }

                        vm.users = normalUsers;
                        vm.user = {};

                    }
                );
        }

        function removeUser($index) {

            var user = vm.users[$index];

            UserService.deleteUserById(user._id)

                .then(

                    function (response) {

                        return UserService.findAllUsers();
                    }
                )
            
                .then(

                    function (users) {

                        vm.users = users;

                    }
                );
        }
    }
})();
