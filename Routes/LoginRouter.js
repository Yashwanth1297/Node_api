const express = require("express");
const router = express.Router();
const {Login} = require("../Controllers/LoginController");

router.route("/").post(Login);

module.exports = router;
