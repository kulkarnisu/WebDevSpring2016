/**
 * Created by sudeep on 2/19/16.
 */
module.exports = function(app, uuid) {

    var userModel = require("./models/user/user.model.js")();

    var formModel = require("./models/form/form.model.js")();

    var userService = require("./services/user.service.server.js")(app, userModel);

    var formService = require("./services/form.service.server.js")(app, formModel, uuid);

    var fieldService = require("./services/field.service.server.js")(app, formModel, uuid);
}