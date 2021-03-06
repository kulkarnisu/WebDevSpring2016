/**
 * Created by sudeep on 3/24/16.
 */
"use strict"

module.exports = function(app, connectionModel) {

    //creates a new connection whose properties are the same as the connection object embedded in the HTTP request's body and
    //the connection belongs to a user whose id is equal to the userId path parameter.
    //The connection object's id is initially null since it is a new record.
    // The id of the new connection should be set dynamically using Node.js guid or node-uuid libraries.
    // These will eventually be set by the database when they are inserted into a collection
    app.post("/api/project/user/:userId/connection", createConnection);

    //returns an array of connections belonging to a user whose id is equal to the userId path parameter
    app.get("/api/project/user/:userId/connection", findAllConnectionsForUser);

    //returns a connection object whose id is equal to the connectionId path parameter
    app.get("/api/project/connection/:connectionId", findConnectionById);

    //updates a connection object whose id is equal to the connectionId path parameter so that its properties are the same as
    //the property values of the connection object embedded in the request's body
    app.put("/api/project/connection/:connectionId", updateConnectionById);

    //removes a connection object whose id is equal to the connectionId path parameter
    app.delete("/api/project/connection/:connectionId", deleteConnectionById);

    app.post("/api/project/share/connection/user/:userId", shareConnection);

    app.post("/api/project/remove/connection/user/:userId", removeSharedConnection);

    function createConnection (req, res) {

        var connection = req.body;
        var userId = req.params.userId;

        connection.userId = userId;

        if(connection.username && connection.password) {
            connection.connectionString = connection.username + ":" + connection.password + "@"
                + connection.host + ":" + connection.port + "/" + connection.dbname;
        } else {
            connection.connectionString = connection.host + ":" + connection.port + "/" + connection.dbname;
        }


        connectionModel.createConnection(connection)
            .then(function(doc) {
                if(doc) {
                    res.json(doc);
                }
            });
    }

    function findAllConnectionsForUser(req, res) {

        var userId = req.params.userId;

        connectionModel.findAllConnectionsForUser(userId)
            .then(function(doc) {
                if(doc) {
                    res.json(doc);
                }
            });
    }

    function findAllConnections(req, res) {

        res.json(connectionModel.findAllConnections());
    }

    function findConnectionById(req, res) {

        var connectionId = req.params.connectionId;

        res.json(connectionModel.findConnectionById(connectionId));
    }

    function updateConnectionById(req, res) {

        var connectionId = req.params.connectionId;
        var connection = req.body;

        if(connection.username && connection.password) {
            connection.connectionString = connection.username + ":" + connection.password + "@"
                + connection.host + ":" + connection.port + "/" + connection.dbname;
        } else {
            connection.connectionString = connection.host + ":" + connection.port + "/" + connection.dbname;
        }

        connectionModel.updateConnectionById(connectionId, connection)
            .then(function(doc) {
                //console.log(doc);
                if(doc) {
                    res.send(200);
                }
            });
    }

    function deleteConnectionById(req, res) {

        var connectionId = req.params.connectionId;

        connectionModel.deleteConnectionById(connectionId)
            .then(function(doc) {
                if(doc) {
                    res.send(200);
                }
            });
    }
    
    function shareConnection(req, res) {

        var userId = req.params.userId;
        var conn = req.body;

        conn.userId.push(userId);

        connectionModel.updateConnectionById(conn._id, conn)
            .then(function(doc) {
                if(doc) {
                    res.send(200);
                }
            });
        
    }

    function removeSharedConnection(req, res) {
        var userId = req.params.userId;
        var connection = req.body;

        if(connection.userId.length > 1 && !(userId == req.user._id)) {

            connection.userId.splice(connection.userId.indexOf(userId), 1);

            connectionModel.updateConnectionById(connection._id, connection)
                .then(function (doc) {
                    if (doc) {
                        res.send(200);
                    }
                });
        }
        else {
            res.send(400);
        }
    }
    
}