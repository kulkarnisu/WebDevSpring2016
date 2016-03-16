/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {

                templateUrl: "client/views/home/home.view.html",

                controller: "HomeController",

                controllerAs: "model"
            })
            .when("/login", {

                templateUrl: "client/views/users/login.view.html",

                controller: "LoginController",

                controllerAs: "model"
            })
            .when("/profile", {

                templateUrl: "client/views/users/profile.view.html",

                controller: "ProfileController",

                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/register", {

                templateUrl: "client/views/users/register.view.html",

                controller: "RegisterController",

                controllerAs: "model"
            })
            .when("/admin", {

                templateUrl: "client/views/admin/admin.view.html",

                controller: "AdminController",

                controllerAs: "model"
            })
            .when("/forms", {

                templateUrl: "client/views/forms/forms.view.html",

                controller: "FormsController",

                controllerAs: "model",

                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/form/:formId/fields", {
                templateUrl: "client/views/forms/fields.view.html",

                controller: "FieldsController",

                controllerAs: "model",

                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({

                redirectTo: "/home"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService.getCurrentUser().then(function (response) {

            var currentUser = response.data;

            if (currentUser) {

                UserService.setCurrentUser(currentUser);
                deferred.resolve();

            } else {

                deferred.reject();
                $location.url("/home");
            }
        });

        return deferred.promise;
    }
})();
