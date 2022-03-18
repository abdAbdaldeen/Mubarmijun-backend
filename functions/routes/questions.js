var express = require("express");
var router = express.Router();
const {
  add,
  getFirst,
  getMore,
  update,
  deleteQ,
  getOne,
  getAllFirst,
  getAllMore,
  getOneLoggedIn,
} = require("../handlers/questions");
const fbAuth = require("../util/fbAuth");

router.post("/add", fbAuth, add);
router.post("/getFirst", getFirst);
router.post("/getMore", getMore);
router.post("/getAllFirst", getAllFirst);
router.post("/getAllMore", getAllMore);
router.get("/getOne/:qID", getOne);
router.get("/getOneLoggedIn/:qID", fbAuth, getOneLoggedIn);
router.post("/update", fbAuth, update);
router.get("/delete/:qID", deleteQ);
module.exports = router;
