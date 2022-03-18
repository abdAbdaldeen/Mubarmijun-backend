var express = require("express");
var router = express.Router();
const {
  signup,
  login,
  getUserData,
  checkIsAdmin,
} = require("../handlers/users");
const fbAuth = require("../util/fbAuth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/get", fbAuth, getUserData);
router.get("/checkIsAdmin", fbAuth, checkIsAdmin);

module.exports = router;
