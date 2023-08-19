const {user} = require("../Models/userModel");
let userObj ={};
const userController = async(req,res) =>{
    try{
    const User = await user.find({email:req.user});
    userObj.Fname = User[0].fname;
    userObj.Lname = User[0].lname;
    console.log("Obj",userObj)
    res.status(200).send(userObj);
    }catch(e){
        res.status(500).send("unable to fetch user information");
    }

}

module.exports ={userController};