const mongoose = require("mongoose")

const userObj = mongoose.Schema({
    username : String,
    useremail: String ,
    userpass: String
})

const userModel = mongoose.model("user", userObj )

module.exports = userModel