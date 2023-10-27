const bcrypt = require("bcrypt");
const {user} = require("../Models/userModel")
const Register = async (req,res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
try{
const salt = await bcrypt.genSalt();
const hashedPassword = await bcrypt.hash(password,salt);

    const dbResult = await user.create({
        fname,
        lname,
        email,
        "password": hashedPassword
    })
    
    return res.status(201).json({"msg":"User Created in the db"});
}catch(err){
    console.log('error', err)
   return  res.status(500).send("Internal Server error");
}
} 

module.exports = {Register};
