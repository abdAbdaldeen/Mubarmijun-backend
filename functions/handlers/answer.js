const { db, admin } = require("../util/admin");
// const firebase = require('firebase');
// const config = require('../util/config');
// const { validateSignupData, validateLoginData, reduceUserDetails } = require('../util/validators');
// const { error } = require('firebase-functions/lib/logger');

exports.add = (req, res) => {
  const newAnswer = {
    userID: req.user.uid,
    questionID: req.body.qID,
    body: req.body.body,
    uImg: req.user.photoURL || '',
    uName: req.user.displayName,
    createdAt: new Date().toISOString(),
    votesCount: 0,
    reportsCount: 0,
  };
  db.collection("answers")
    .add(newAnswer)
    .then((doc) => {
      const resAnswer = newAnswer;
      resAnswer.aID = doc.id;
      res.json(resAnswer);
    })
    .catch((err) => {
      res.status(500).json({ error: "somethig went wrong" });
      console.error(err);
    });
};

exports.delete = (req, res) => {
  let aDoc = db.collection("answers").doc(req.params.aID);

  aDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (req.user.uid == doc.data().userID) {
          aDoc.delete().then(() => {
            return res.json("Successfully delete answer");
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
  let aDoc = db.collection("answers").doc(req.params.aID);

  aDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (req.user.uid == doc.data().userID) {
          aDoc
            .update({
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
exports.vote = async (req, res) => {
  const answerRef = db.collection("answers").doc(req.body.aID);
  const batch = db.batch();
  batch.update(answerRef, {
    votesCount: admin.firestore.FieldValue.increment(req.body.vote),
  });
  batch.commit().then(() => {
    db.collection("votes").add({
      docID: req.body.aID,
      userID: req.user.uid,
      vote: req.body.vote,
    });
  });
  return res.send("1");
};
