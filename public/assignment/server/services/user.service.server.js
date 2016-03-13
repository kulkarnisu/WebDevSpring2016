/**
 * Created by sudeep on 3/13/16.
 */
"use strict"

module.exports = function(app) {
    var userModel = require("./../models/user/user.model.js")();

    //creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/assignment/user", createUser);

    //responds with an array of all users
    app.get("/api/assignment/user", findAllusers);

    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/assignment/user/:id", findUserById);

    //responds with a single user whose username property is equal to the username path parameter
    app.get("api/assignment/user?username=:username", findUserByUsername);

    //responds with a single user whose username property is equal to the username path parameter
    //and its password is equal to the password path parameter
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);

    //updates an existing user whose id property is equal to the id path parameter.
    // The new properties are set to the values in the user object embedded in the HTTP request.
    // Responds with an array of all users
    app.put("/api/assignment/user/:id", updateUserById);

    //removes an existing user whose id property is equal to the id path parameter. Responds with an array of all users
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser (req, res) {

        var user = req.body;

        res.send(userModel.createUser(user));
    }

    function findAllusers (req, res) {

        res.json(userModel.findAllUsers());
    }

    function findUserById(req, res) {

        var usereId = parseInt(req.param.id);

        res.json(userModel.findUserById(userId));
    }

    function findUserByUsername(req, res) {

        var username = req.param.username;

        res.json(userModel.findUserByUsername(username));
    }

    function findUserByCredentials(req, res) {

        var username = req.params.username;
        var password = req.params.password;

        var credentials = {username: username, passwword: password};

        res.json(userModel.findUserByCredentials(credentials));
    }

    function updateUserById(req, res) {

        var userId = parseInt(req.param.id);
        var user = req.body;

        userModel.updateUserById(userId, user);
        res.sendStatus(200);
    }

    function deleteUserById(req, res) {

        var userId = parseInt(req.param.id);

        userModel.deleteUserById(userId);

        res.sendStatus(200);
    }
}
