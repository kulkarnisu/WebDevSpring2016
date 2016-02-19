/**
 * Created by sudeep on 2/19/16.
 */
(function() {
    angular
        .module("MovieApp")
        .controller("SearchController", SearchController);

    function SearchController(MovieService, $scope, $http, $routeParams, $location) {

        var title = $routeParams.title;

        if(title) {
            search(title);
        }
        //event handlers declarations
        $scope.search = search;

        //event handler implementations
        function search(title) {
            $location.url("search/"+title);
            MovieService.findMoviesByTitle(title, render);
        }

        //Callback Function for Service
        function render(response) {
           $scope.data = response;
        }
    }
})();