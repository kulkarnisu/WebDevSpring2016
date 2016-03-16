/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($rootScope, $location) {

        var vm = this;

        function init() {

            vm.$location = $location;
        }
        init();
    }
})();