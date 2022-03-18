var express = require("express");
var router = express.Router();
const { add, vote } = require("../handlers/answer");
const fbAuth = require("../util/fbAuth");

router.post("/add", fbAuth, add);
router.post("/vote", fbAuth, vote);

module.exports = router;
