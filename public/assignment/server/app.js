/**
 * Created by sudeep on 2/19/16.
 */
module.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/form.service.server.js")(app);
    require("./services/field.service.server.js")(app);
}