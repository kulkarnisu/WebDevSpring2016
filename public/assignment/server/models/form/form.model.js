/**
 * Created by sudeep on 3/13/16.
 */
"use strict"

var mock = require("./form.mock.json");

module.exports = function() {
    var api = {
        createForm: createForm,
        findFormById: findFormById,
        findAllForms: findAllForms,
        updateFormById: updateFormById,
        deleteFormId: deleteFormId,
        findFormByTitle: findFormByTitle,
        findAllFormsByUserId: findAllFormsByUserId,
    };
    return api;

    function createForm(form) {
        mock.push(form);
    }

    function findFormById(formId) {
        for (var i in mock) {
            if(mock[i]._id === formId) {
                return mock[i];
            }
        }
        return null;
    }

    function findAllForms() {return mock;}

    function updateFormById(formId, form) {
        for (var i in mock) {
            if(mock[i]._id === formId) {
                mock[i] = form;
                break;
            }
        }
        return mock;
    }

    function deleteFormId(formId) {
        for (var i in mock) {
            if (mock[i]._id === formId) {
                mock.splice(i,1);
                break;
            }
        }
        return mock;
    }

    function findFormByTitle(formTitle) {
        for (var i in mock) {
            if (mock[i].title === formTitle) {
                return mock[i];
            }
        }
        return null;
    }

    function findAllFormsByUserId(userId) {
        var forms;

        for (var i in mock) {
            if (mock[i].userId === userId) {
                forms.push(mock[i]);
            }
        }

        return forms;
    }

}
