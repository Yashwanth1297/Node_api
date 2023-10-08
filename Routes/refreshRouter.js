const express = require("express");
const router = express.Router();
const {refresh} = require("../Controllers/refreshController");
const verifyRefreshToken = require("../Middlewares/verifyrefreshMiddleware");

console.log("inside router");

router.route("/").get(verifyRefreshToken,refresh);

module.exports = router;