/**
 * Created by sudeep on 4/1/16.
 */

module.exports = function(db, mongoose, formModel) {

    var fieldSchema = require("./field.schema.server")(mongoose);

    var fieldModel = mongoose.model("Field", fieldSchema);

    var formModel = formModel.getMongooseModel();

    var api = {

        createFieldForForm: createFieldForForm,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldIdAndFormId: findFieldByFieldIdAndFormId,
        updateFieldByFieldIdAndFormId: updateFieldByFieldIdAndFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId
    }

    return api;

    function createFieldForForm(formId, field) {

        return formModel.findOne(formId);
    }

    function findAllFieldsForForm (formId) {

        return formModel.findOne(formId).select("fields");
    }

    function findFieldByFieldIdAndFormId(formId, fieldId) {

        return formModel.findOne(formId).select("fields").findOne(fieldId);

    }

    function updateFieldByFieldIdAndFormId(formId, fieldId, field) {

        return formModel
            .update(
                {_id: formId, "fields._id": fieldId},

                {$set: {
                    "fields.$": field
                }
            });

    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {

        return formModel.findOne(formId)

            .then(

                function (form) {
                    
                    form.fields.id(fieldId).remove();
                    return form.save();

                },

                function (err) {

                    return null;

                }
            );
    }
}

