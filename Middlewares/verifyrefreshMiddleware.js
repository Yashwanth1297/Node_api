const config = require("../Config")();
const jwt = require("jsonwebtoken");
const verifyRefreshToken = (req, res, next) => {
    const cookieValue = req.cookies.refreshToken;

    if (!cookieValue) {
      return res.status(401).send("Refresh token not found");
    }
  
    try {
    jwt.verify(cookieValue, config.refreshTokenSecret,(err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }else{
            req.decodedRefreshToken = decoded;
            next(); // Move to the next middleware
        }
    })
    } catch (error) {
      return res.status(500).send("Error Generating Refresh token");
    }
  };

  module.exports = verifyRefreshToken;