const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
    address:{
        addressLine1:String,
        addressLine2:String,
        city:String,
        State:String,
        ZipCode:String
    }
})

const user = mongoose.model("user",userSchema);

module.exports = {user};