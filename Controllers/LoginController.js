const bcrypt = require("bcrypt");
const {user} = require("../Models/userModel")
const Login = async (req,res) => {
    console.log("request",req.body);
    const username = req.body.username;
    const password = req.body.password;

    const authStatus = await user.find({"email":username,"password":password});
    if(authStatus == 0){
        return res.status(401).send("not allowed");
    }
    // try{
    //     if(await bcrypt.compare(password))
    // }
    console.log(authStatus);
    res.status(200).json({msg : "Inside Login Controller"});
}

module.exports ={Login};


