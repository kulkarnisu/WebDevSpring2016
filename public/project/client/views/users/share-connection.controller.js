/**
 * Created by sudeep on 4/24/16.
 */

"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ShareController", shareController);

    function shareController(UserService, ConnectionsService, $rootScope, $location) {

        var vm = this;

        function init() {

            ConnectionsService.findAllConnectionsForUser($rootScope.currentUser._id).then(function(response) {

                vm.connections = response;

                vm.$location = $location;

            });

        }
        init();

    }
})();
