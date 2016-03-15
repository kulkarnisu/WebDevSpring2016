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

        vm.$location = $location;

        $rootScope.currentUser = null;
    }
})();