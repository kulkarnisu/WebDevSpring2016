/**
 * Created by sudeep on 3/13/16.
 */
"use strict"

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

var bcrypt = require("bcrypt-nodejs");


module.exports = function(app, userModel, uuid) {

    var auth = authorized;

    //creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/assignment/user",  createUser);

    //Return logged in user (possibly null)
    app.get("/api/assignment/user/loggedin", loggedIn);

    //Logout current user
    app.post("/api/assignment/user/logout", logout);

    //responds with an array of all users
    app.get("/api/assignment/user", auth,  findAllusers);

    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/assignment/user/:id", findUserById);

    //updates an existing user whose id property is equal to the id path parameter.
    // The new properties are set to the values in the user object embedded in the HTTP request.
    // Responds with an array of all users
    app.put("/api/assignment/user/:id", auth,  updateUserById);

    //removes an existing user whose id property is equal to the id path parameter. Responds with an array of all users
    app.delete("/api/assignment/user/:id", auth, deleteUserById);

    app.post  ('/api/assignment/login', passport.authenticate('local'), login);

    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    
    passport.deserializeUser(deserializeUser);


    function createUser (req, res) {

        var newUser = req.body;
        newUser.roles = ['student'];

        userModel.findUserByUsername(newUser.username)
            .then(
                
                function (user) {

                    if(user) {
                        res.json(null);
                    }
                    else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
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

    function findAllusers (req, res) {

        if(req.query.username && req.query.password) {

            findUserByCredentials(req, res);

        }else if (req.query.username) {

            findUserByUsername(req, res);

        }else {

            if(isAdmin(req.user)) {

                res.json(userModel.findAllUsers());

            }else {
                res.status(403);
            }
        }
    }

    function findUserById(req, res) {

        var userId = req.params.id;

        userModel.findUserById(userId)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {

        var username = req.query.username;

        userModel.findUserByUsername(username)

            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        var credentials = {username: username, password: password};

        var currentUser = userModel.findUserByCredentials(credentials)

            .then(

                function (doc) {

                    req.session.currentUser = doc;

                    res.json(doc);

                },

                function (err) {

                    res.status(400).send(err);
                }
            )
    }

    function loggedIn(req, res) {

        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {

        req.logOut();
        res.send(200);
    }

    function updateUserById(req, res) {

        var userId = req.params.id;

        var user = req.body;

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }


        userModel.updateUserById(userId, user)

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

    function deleteUserById(req, res) {

        var userId = req.params.id;

        if(isAdmin(req.user)) {

            userModel.deleteUserById(userId)

                .then(
                    function (err) {

                        if (err) {

                            res.status(400).send(err);
                        }
                        else {
                            res.status(200).send('Deleted');
                        }
                    }
                );
        }else {
            res.status(403);
        }
    }
    
    function localStrategy(username, password, done) {

        userModel.findUserByUsername(username)

            .then(
    
                function (user) {

                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }else {
                        return done(null, false);
                    }
                    
                } ,
                function (err) {

                    if (err) { return done(err); }
                }
            )
    }

    function serializeUser(user, done) {

        done(null, user);

    }

    function deserializeUser(user, done) {
        userModel
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

    function login(req, res) {

        var user = req.user;
        res.json(user);
    }

    function isAdmin(user) {

        if(user.roles.indexOf("admin") > 0) {

            return true;
        }

        return false;
    }

    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {

            res.send(401);

        } else {

            next();
        }
    }


}
