const jwt = require("jsonwebtoken");
const config = require("../Config")()
const accessTokenSecret = config.accessTokenSecret;
const authenticationMiddleware = (req,res,next) =>{
    console.log("req",req.body);
    console.log("req",req.headers);
    const token = req.headers.authorization;
    if(!token){
       return res.status(401).json({"msg":"not authenticated please login"})
    }
    jwt.verify(token, accessTokenSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }else{
        req.user = decoded;
            next();
        }
    })


}

module.exports = authenticationMiddleware
