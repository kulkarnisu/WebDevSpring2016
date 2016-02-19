/**
 * Created by sudeep on 2/19/16.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("NavController", NavController);

    function NavController($location, $scope) {
        $scope.$location = $location;
    }
})();