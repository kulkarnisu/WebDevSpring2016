/**
 * Created by sudeep on 3/13/16.
 */
"use strict"

module.exports = function (app, formModel, uuid) {

    //creates a new field whose properties are the same as the field object embedded in the request's body and
    // the field belongs to a form whose id is equal to the formId path parameter.
    // The field object's id is initially null since it is a new record.
    // The id of the new form field should be set dynamically using Node.js guid or node-uuid libraries.
    // These will eventually be set by the database when they are inserted into a collection
    app.post("/api/assignment/form/:formId/field", createFormField);

    //returns an array of fields belonging to a form object whose id is equal to the formId path parameter
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);

    //returns a field object whose id is equal to the fieldId path parameter
    //and belonging to a form object whose id is equal to the formId path parameter
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);

    //updates a field object whose id is equal to the fieldId path parameter and
    // belonging to a form object whose id is equal to the formId path parameter
    // so that its properties are the same as the property values of the field object embedded in the request's body
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);

    //removes a field object whose id is equal to the fieldId path parameter and
    // belonging to a form object whose id is equal to the formId path parameter
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);

    function createFormField (req, res) {

        var field = req.body;
        var formId = req.params.formId;

        console.log(formModel.createFieldForForm(formId, field));

        /*formModel.createFieldForForm(formId, field)
        
            .then(
                
                function (form) {

                    if(form) {

                        res.status(200).send("Created");

                    } else {

                        res.status(400).send("Error");
                    }
                    
                },
                
                function (err) {

                    res.status(400).send(err);
                    
                }
            );*/
    }

    function findAllFieldsForForm(req, res) {

        var formId = req.params.formId;

        res.json(formModel.findAllFieldsForForm(formId));

    }

    function findFieldByFieldIdAndFormId(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        res.json(formModel.findFieldByFieldIdAndFormId(formId, fieldId));
    }

    function updateFieldByFieldIdAndFormId (req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;

        formModel.updateFieldByFieldIdAndFormId(formId, fieldId, field)

            .then(

                function (form) {

                    if (form) {

                        res.status(200).send("Updated");
                    } else {

                        res.status(400).send("Error");
                    }

                },

                function (err) {

                    res.status(400).send(err);

                }
            );
    }

    function deleteFieldByFieldIdAndFormId (req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        FormModel.deleteFieldByFieldIdAndFormId(formId, fieldId)

            .then(

                function (form) {

                    if (form) {

                        res.status(200).send("Deleted");

                    } else {

                        res.status(400).send("Error");
                    }

                },

                function (err) {

                    res.status(400).send(err);

                }
            );
    }

}


