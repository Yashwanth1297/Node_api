const bcrypt = require("bcrypt");
const { user } = require("../Models/userModel");
const config = require("../Config")();
const jwt = require("jsonwebtoken");
const accessTokenSecret = config.accessTokenSecret;
// eslint-disable-next-line node/no-extraneous-require
const cookie = require("cookie");
const refreshTokenSecret = config.refreshTokenSecret;

const Login = async (req, res) => {
  const username = req.body.email;
  const pass = req.body.password;

  const customer = await user.find({ email: username });
  if (customer.length === 0) {
    return res.status(404).send("Cannot Find User");
  }

  try {
    if (bcrypt.compare(pass, customer[0].password)) {
      // Generate access token with a short expiry (1 minute)
      const accessToken = jwt.sign({ username }, accessTokenSecret, {
        expiresIn: "60m",
      });

      // Generate a refresh token with a longer expiry (e.g., 7 days)
      const refreshToken = jwt.sign({ username }, refreshTokenSecret, {
        expiresIn: "3h",
      });

      // Set both tokens in the HTTP-only cookie
      const cookieOptions = {
        httpOnly: true,
        path:"/",
      };

      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader(
        "Set-Cookie",
        // eslint-disable-next-line no-undef
        cookie.serialize("refreshToken", refreshToken, cookieOptions)
      );

      return res.status(200).json({message:"Login Succesful",accessToken});
    } else {
      return res.status(401).send("Incorrect Username or Password");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = { Login };
