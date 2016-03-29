/**
 * Created by sudeep on 3/29/16.
 */
"use strict"

module.exports = function (mongoose) {

    var userSchema = mongoose.Schema({

        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phones: [String]

    }, {collection: 'assignment.user'});

    return userSchema;

}
