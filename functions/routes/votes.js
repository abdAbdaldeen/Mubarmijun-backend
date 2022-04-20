var express = require("express");
var router = express.Router();
const { checkVote, removeVote, add, vote } = require("../handlers/votes");
const fbAuth = require("../util/fbAuth");

router.post("/vote", fbAuth, vote);

// router.post("/add", fbAuth, add);
// router.post("/checkVote", fbAuth, checkVote);
// router.post("/removeVote", fbAuth, removeVote);
module.exports = router;
