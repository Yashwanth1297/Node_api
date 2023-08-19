const jwt = require("jsonwebtoken");
const config = require("../Config")()
const accessTokenSecret = config.accessTokenSecret;
const authenticationMiddleware = (req,res,next) =>{
    const {token} = req.headers;
    if(!token){
       return res.status(401).json({"msg":"not authenticated please login"})
    }
    jwt.verify(token, accessTokenSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    
        // Attach the decoded token payload to the request for use in subsequent middleware or route handler
        req.user = decoded;


    next();
})
}

module.exports = authenticationMiddleware