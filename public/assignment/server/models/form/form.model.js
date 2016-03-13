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
        findFormByTitle: findFormByTitle
    };
    return api;

    function createForm(form) {
        mock.push(form);
        return mock;
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
                delete mock[i];
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

}
