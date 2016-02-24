/**
 * Created by sudeep on 2/20/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    var forms = [
        {"_id": "000", "title": "Contacts", "userId": 123},
        {"_id": "010", "title": "ToDo",     "userId": 123},
        {"_id": "020", "title": "CDs",      "userId": 234}];

    function FormService() {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function createFormForUser(userID, form, callback) {
            var newForm = {
                _id: (new Date).getTime(),
                userId: userID,
                title: form.title
            };
            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userID, callback) {
            var formsForUser = [];
            for(var i=0; i< forms.length;i++) {
                if(forms[i].userId === userID) {
                    formsForUser.push(forms[i]);
                }
            }
            callback(formsForUser);
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
