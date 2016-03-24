/**
 * Created by sudeep on 3/24/16.
 */

module.exports = function(app, uuid) {

    var connectionModel = require("./models/connection/connection.model.js")();
    
    var connectionService = require("./services/connection.service.server.js")(app, connectionModel, uuid);

}
