/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, $routeParams, $location) {

        var vm = this;

        vm.fields = {};

        vm.removeField = removeField;

        vm.oldIndex = -1;

        var formId = -1;

        function init() {

            if($routeParams.formId) {

                formId = $routeParams.formId;

                FieldService.getFieldsForForm(formId).then(function (response) {

                    vm.fields = response;

                });

            }  else {

                $location.url("/forms");
            }
        }
        init();

        function removeField($index) {

            var fieldId = vm.fields[$index]._id;

            FieldService.deleteFieldFromForm(formId, fieldId).then(function (response) {

                if(response === "OK") {

                    FieldService.getFieldsForForm(formId).then(function (response) {

                        vm.fields = response;

                    });
                }
            });
        }
    }
})();
