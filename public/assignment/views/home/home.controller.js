/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope) {
        $rootScope.currentUser = {}
    }
})();
