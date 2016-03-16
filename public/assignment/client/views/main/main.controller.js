/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($location, $rootScope) {

        var vm = this;

        function init() {

            vm.$location = $location;
        }
        init();

        $rootScope.currentUser = null;
    }
})();