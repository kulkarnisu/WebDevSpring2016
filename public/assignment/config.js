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
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
