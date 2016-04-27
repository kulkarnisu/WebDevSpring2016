/**
 * Created by sudeep on 4/26/16.
 */

"use strict";
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, assignmentUserModel, projectUserModel) {

    passport.use('assignment',   new LocalStrategy(assignmentLocalStrategy));
    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var auth = authorized;

    app.post  ('/api/assignment/login',    passport.authenticate('assignment'), login);
    app.post  ('/api/assignment/user/logout',   logout);
    app.get   ('/api/assignment/user/loggedin', assignmentLoggedin);
    app.post  ('/api/assignment/register', register);
    app.post  ("/api/assignment/admin/user", auth, assignmentCreateUser);
    app.get   ("/api/assignment/admin/user", auth,  assignmentFindAllusers);
    app.put   ("/api/assignment/admin/user/:id", auth,  assignmentUpdateUserById);
    app.delete("/api/assignment/admin/user/:id", auth,  assignmentDeleteUserById);

    app.post  ('/api/project/login',    passport.authenticate('project'), login);
    app.post  ('/api/project/user/logout',   logout);
    app.get   ('/api/project/user/loggedin', projectLoggedin);
    app.post  ('/api/project/register', register);
    app.get  ('/api/project/admin/user', auth, findAllProjectUsers)

    function assignmentLocalStrategy(username, password, done) {
        assignmentUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function projectLocalStrategy(username, password, done) {
        projectUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        if(user.type == 'project') {
            projectUserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else if(user.type == 'assignment') {
            assignmentUserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }

    function login(req, res) {

        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function assignmentLoggedin(req, res) {
        res.send(req.isAuthenticated() && req.user.type === "assignment" ? req.user : null);
    }

    function projectLoggedin(req, res) {
        res.send(req.isAuthenticated() && req.user.type === "project" ? req.user : null);
    }

    function register (req, res) {

        var newUser = req.body;
        newUser.roles = ['student'];

        if(newUser.type === 'assignment') {
            assignmentUserModel.findUserByUsername(newUser.username)
                .then(

                    function (user) {

                        if(user) {
                            res.json(null);
                        }
                        else {
                            newUser.password = bcrypt.hashSync(newUser.password);
                            return assignmentUserModel.createUser(newUser);
                        }
                    }
                )

                .then(

                    function (user) {

                        if(user) {

                            req.login(user,function (err) {

                                if(err) {
                                    res.status(400).send(err);

                                } else {
                                    res.json(user);
                                }

                            });
                        }

                    },

                    function (err) {

                        res.status(400).send(err);

                    }
                );
        }else {
            return projectUserModel.findUserByUsername(newUser.username)
                .then(

                    function (user) {

                        if(user) {
                            res.json(null);
                        }
                        else {
                            newUser.password = bcrypt.hashSync(newUser.password);
                            return projectUserModel.createUser(newUser);
                        }
                    }
                )

                .then(

                    function (user) {

                        if(user) {

                            req.login(user,function (err) {

                                if(err) {
                                    res.status(400).send(err);

                                } else {
                                    res.json(user);
                                }

                            });
                        }

                    },

                    function (err) {

                        res.status(400).send(err);

                    }
                );
        }

    }

    function assignmentCreateUser(req, res) {

        var newUser = req.body;

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");

        } else {

            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        assignmentUserModel
            .findUserByUsername(newUser.username)
            .then(

                function(user){

                    // if the user does not already exist
                    if(user == null) {

                        newUser.password = bcrypt.hashSync(newUser.password);
                        // create a new user
                        return assignmentUserModel.createUser(newUser)

                            .then(

                                // fetch all the users
                                function(){

                                    return userModel.asignmentFindAllusers();
                                },

                                function(err){

                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {

                        return assignmentUserModel.findAllUsers();
                    }
                },

                function(err){

                    res.status(400).send(err);
                }
            )
            .then(

                function(users){

                    res.json(users);
                },
                function(){

                    res.status(400).send(err);
                }
            );
    }

    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {

            res.send(401);

        } else {

            next();
        }
    }

    function assignmentFindAllusers (req, res) {

        if (req.query.username) {

            assignmentFindUserByUsername(req, res);

        }else {

            if(isAdmin(req.user)) {

                assignmentUserModel.findAllUsers()

                    .then(

                        function (users) {

                            var normalUsers = [];

                            for(var i in users) {
                                if(users[i].roles.indexOf('admin') === -1) {
                                    normalUsers.push(users[i]);
                                }
                            }

                            res.json(normalUsers);

                        },

                        function (err) {

                            res.status(400);
                        }
                    );

            }else {
                res.status(403);
            }
        }
    }

    function assignmentFindUserByUsername(req, res) {

        var username = req.query.username;

        assignmentUserModel.findUserByUsername(username)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }

    function assignmentUpdateUserById(req, res) {

        var userId = req.params.id;

        var user = req.body;

        if(!isAdmin(req.user)) {
            delete user.roles;
        }

        user.password = bcrypt.hashSync(user.password);

        assignmentUserModel.updateUserById(userId, user)

            .then(

                function (doc) {

                    if(!doc) {

                        res.status(400).send('Error');
                    } else {

                        res.status(200).send('Updated');
                    }
                }
            );
    }

    function assignmentDeleteUserById(req, res) {

        var userId = req.params.id;

        if(isAdmin(req.user)) {

            assignmentUserModel.deleteUserById(userId)

                .then(
                    function (doc) {

                        if (doc) {

                            res.status(200).send('Deleted');
                        }
                        else {

                            res.status(400).send(err);
                        }
                    }
                );
        }else {
            res.status(403);
        }
    }

    function isAdmin(user) {

        if(user.roles.indexOf("admin") >= 0) {

            return true;
        }

        return false;
    }

    function findAllProjectUsers(req, res) {

        if(isAdmin(req.user)) {
            projectUserModel.findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400);
                    }
                );

        }else {
            res.status(403);
        }

    }
}
