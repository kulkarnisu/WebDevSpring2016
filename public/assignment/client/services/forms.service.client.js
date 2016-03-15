/**
 * Created by sudeep on 2/20/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function createFormForUser(userID, form) {

            var deferred = $q.defer();

            var url = "/api/assignment/user/:userId/form";
            url = url.replace(":userId", userID);

            $http.post(url, form).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findAllFormsForUser(userID, callback) {

            var deferred = $q.defer();

            var url = "/api/assignment/user/:userId/form";
            url = url.replace(":userId", userID);

            $http.get(url).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deleteFormById(formID, callback) {
            for(var i= 0; i< forms.length;i++) {
                if(forms[i]._id === formID) {
                    forms.splice(i,1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formID, newForm, callback) {
            var updatedForm = null;
            for(var i= 0; i< forms.length;i++) {
                if(forms[i]._id === formID) {
                    forms[i].title = newForm.title;
                    updatedForm = forms[i];
                    break;
                }
            }
            callback(updatedForm);
        }
    }
})();
