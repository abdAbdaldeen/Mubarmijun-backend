const { db, admin } = require("../util/admin");
const { getDate } = require("../util/common");
// const { getUserId } = require("../util/fbAuth");
const { checkVote, checkReport } = require("../util/votes");
var { parse } = require("node-html-parser");

exports.deleteUserDoc = (req, res) => {
  let qDoc = db.collection(req.body.collection).doc(req.body.docID);
  //check if the user is owner of question
  qDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (req.user.uid == doc.data().userID) {
          // update question
          qDoc.delete().then(() => {
            return res.json("Successfully delete doc");
          });
        } else {
          return res.status(403).json("Unauthorized");
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "somethig went wrong" });
      console.error(err);
    });
};

exports.update = (req, res) => {
  let qDoc = db.collection("questions").doc(req.body.qID);

  //check if the user is owner of question
  qDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (req.user.uid == doc.data().userID) {
          // update question
          qDoc
            .update({
              titel: req.body.titel,
              body: req.body.body,
            })
            .then(() => {
              return res.json("Successfully update question");
            });
        } else {
          return res.status(403).json("Unauthorized");
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "somethig went wrong" });
      console.error(err);
    });
};
