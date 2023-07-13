const express = require("express");
const router = express.Router();
const {Register} = require("../Controllers/RegisterController");

router.route("/").post(Register);

module.exports = router;