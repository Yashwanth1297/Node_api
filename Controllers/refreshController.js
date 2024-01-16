const config = require("../Config");
const jwt = require("jsonwebtoken");
const refresh = (req, res) => {
  console.log("Inside refresh controller");
  // Extract user data from the decoded refresh token if needed
  const { username } = req.decodedRefreshToken;

  // Generate a new access token
  const accessToken = jwt.sign({ username }, config.accessTokenSecret, {
    expiresIn: "60m", // Set the expiration time for the new access token
  });
  // Send a response indicating success
  return res.status(200).json({ message: "Access token refreshed successfully", accessToken });
};

module.exports = { refresh };