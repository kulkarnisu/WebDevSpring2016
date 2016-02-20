/**
 * Created by sudeep on 2/19/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    var current_users = [
        {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
            "username":"alice",  "password":"alice",   "roles": ["student"]                },
        {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
            "username":"bob",    "password":"bob",     "roles": ["admin"]                },
        {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
            "username":"charlie","password":"charlie", "roles": ["faculty"]                },
        {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
            "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
        {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
            "username":"ed",     "password":"ed",      "roles": ["student"]                }
    ];

    function UserService() {
        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByUsernameAndPassword(username, password, callback) {
            var userFound = null;
            for (var i =0; i < current_users.length;i++) {
                if(current_users[i].username === username && current_users[i].password === password) {
                    userFound = {
                        _id: current_users[i]._id,
                        firstName: current_users[i].firstName,
                        lastName: current_users[i].lastName,
                        username: current_users[i].username,
                        password: current_users[i].password,
                        roles: current_users[i].roles,
                        email: current_users[i].email
                    };
                    break;
                }
            }
            callback(userFound);
        }

        function findAllUsers(callback) {
            callback(current_users);
        }

        function createUser(user, callback) {
            var newUser = {
                _id: (new Date).getTime(),
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                roles: user.roles,
                email: user.email
            };
            current_users.push(newUser);
            callback(newUser);
        }

        function deleteUserById(userID, callback) {
            var deleteID = -1;

            for(user in current_users) {
                if(user._id === userID){
                    deleteID = current_users.indexOf(user);
                    break;
                }
            }
            if(deleteID != -1) {
                current_users.splice(deleteID, 1);
            }
            callback(current_users);
        }

        function updateUser(userID, user, callback) {
            var updatedIndex = -1;
            for(var i=0; i< current_users.length; i++) {
                if(current_users[i]._id === userID) {
                    updatedIndex = i;
                    break;
                }
            }
            if(updatedIndex > -1){
                current_users[updatedIndex].lastName = user.lastName;
                current_users[updatedIndex].firstName = user.firstName;
                current_users[updatedIndex].username = user.username;
                current_users[updatedIndex].password = user.password;
                current_users[updatedIndex].roles = user.roles;
                current_users[updatedIndex].email = user.email;
            }
            callback(current_users[updatedIndex]);
        }
    }
})();