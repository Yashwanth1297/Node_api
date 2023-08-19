const express = require("express");
const router = express.Router();
const {userController} = require("../Controllers/userController");
const authenticationMiddleware = require("../Middlewares/authenticationMiddleware");


router.route("/").get(authenticationMiddleware,userController);

module.exports = router;