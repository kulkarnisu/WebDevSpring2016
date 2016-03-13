/**
 * Created by sudeep on 2/19/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, $rootScope, FormService, $location) {

        //Event handler declarations
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        FormService.findAllFormsForUser($rootScope.currentUser._id, getAllForms);

        function getAllForms(forms){
            $scope.forms=forms;
        }


        //Event handler implementations
        function addForm(form) {
            FormService.createFormForUser($rootScope.currentUser._id, form, addInView);

            function addInView(form) {
                var newForm = {
                    _id: form._id,
                    title: form.title,
                    userId: form.userId
                };
                $scope.forms.push(newForm);
                $scope.form = {};
            }
        }

        function updateForm(form) {
            FormService.updateFormById(form._id,form, displayUpdatedForm);

            function displayUpdatedForm(updatedForm) {
                var index = $scope.forms.indexOf(form);
                $scope.forms[index] = updatedForm;
            }
            $scope.form={};
        }

        function deleteForm($index) {
            var formID = $scope.forms[$index]._id;
            FormService.deleteFormById(formID, updateForms);

            function updateForms(updatedForms) {
                FormService.findAllFormsForUser($rootScope.currentUser._id, getAllForms);

                function getAllForms(forms){
                    $scope.forms=forms;
                }
            }
        }

        function selectForm($index) {
            $scope.form={};
            var selectedForm = $scope.forms[$index];
            $scope.form = {
                _id: selectedForm._id,
                title: selectedForm.title,
                userId: selectedForm.userId
            };
        }
    }
})();
