const bcrypt = require("bcrypt");
const {user} = require("../Models/userModel");
const config = require("../Config")()
const jwt = require("jsonwebtoken");
const accessTokenSecret = config.accessTokenSecret;
const Login = async (req,res) => {
    const username = req.body.email;
    const pass = req.body.password;

    const customer = await user.find({email:username});
    if(customer.length == 0){
        return res.status(404).send("Cannot Find User");
    }
    try{
        if(await bcrypt.compare(pass, customer[0].password)){
            const accessToken = jwt.sign(username, accessTokenSecret)
            console.log(accessToken);
            return res.json({token:accessToken});
        }else{
            return res.status(401).send("Incorrect Username or Password");
        }
    }catch(err){
        return res.status(500).send("Internal server error");
    }
}

module.exports ={Login};


