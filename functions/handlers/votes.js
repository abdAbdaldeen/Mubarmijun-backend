const { db, admin } = require("../util/admin");

const { error } = require("firebase-functions/lib/logger");

exports.vote = async (req, res) => {
  if (req.body.docID) {
    try {
      let checkVoteRes = await checkVote(req);
      if (!checkVoteRes) {
        await addVote(req);
        return res.send("1");
      } else {
        removeVote(req, checkVoteRes);
        return res.send("1");
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "somethig went wrong" });
    }
  } else {
    res.status(400).json({ error: "somethig went wrong" });
  }
};
const checkVote = async (req) => {
  return await db
    .collection("votes")
    .where("docID", "==", req.body.docID)
    .where("userID", "==", req.user.uid)
    .get()
    .then(async (snapshot) => {
      if (snapshot.empty) {
        return 0;
      }
      return await snapshot.docs[0].data().vote;
    });
};
const addVote = async (req) => {
  const docRef = db.collection(req.body.collection).doc(req.body.docID);
  const batch = db.batch();
  batch.update(docRef, {
    votesCount: admin.firestore.FieldValue.increment(req.body.vote),
  });
  // ============== apply coins change
  await docRef.get().then(async (doc) => {
    const coinsDocRef = db.collection("coins").doc(doc.data().userID);
    batch.update(coinsDocRef, {
      coins: admin.firestore.FieldValue.increment(req.body.vote),
    });
    await batch.commit().then(() => {
      db.collection("votes").add({
        docID: req.body.docID,
        userID: req.user.uid,
        vote: req.body.vote,
      });
    });
  });
};

const removeVote = async (req, vote) => {
  const batch = db.batch();
  const docRef = db.collection(req.body.collection).doc(req.body.docID);
  const votes = await db
    .collection("votes")
    .where("docID", "==", req.body.docID)
    .where("userID", "==", req.user.uid)
    .get();
  votes.forEach((doc) => {
    batch.delete(doc.ref);
  });
  batch.update(docRef, {
    votesCount: admin.firestore.FieldValue.increment(vote * -1),
  });
  return await docRef.get().then(async (doc) => {
    const coinsDocRef = db.collection("coins").doc(doc.data().userID);
    batch.update(coinsDocRef, {
      coins: admin.firestore.FieldValue.increment(vote * -1),
    });
    return await batch.commit();
  });
};

exports.add = async (req, res) => {
  const docRef = db.collection(req.body.collection).doc(req.body.docID);
  const batch = db.batch();
  batch.update(docRef, {
    votesCount: admin.firestore.FieldValue.increment(req.body.vote),
  });
  // ==============
  docRef.get().then((doc) => {
    const coinsDocRef = db.collection("coins").doc(doc.data().userID);
    batch.update(coinsDocRef, {
      coins: admin.firestore.FieldValue.increment(req.body.vote),
    });
    batch.commit().then(() => {
      db.collection("votes").add({
        docID: req.body.docID,
        userID: req.user.uid,
        vote: req.body.vote,
      });
    });
  });
  return res.send("1");
};
exports.checkVote = (req, res) => {
  if (req.body.docID) {
    db.collection("votes")
      .where("docID", "==", req.body.docID)
      .where("userID", "==", req.user.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return res.json(0);
        }
        snapshot.forEach((doc) => {
          res.json(doc.data().vote);
        });
      })
      .catch((err) => {
        res.status(500).json({ error: "somethig went wrong" });
        console.error(err);
      });
  } else {
    res.status(400).json({ error: "somethig went wrong" });
  }
};

exports.removeVote = async (req, res) => {
  const batch = db.batch();
  const docRef = db.collection(req.body.collection).doc(req.body.docID);
  const votes = await db
    .collection("votes")
    .where("docID", "==", req.body.docID)
    .where("userID", "==", req.user.uid)
    .get();
  votes.forEach((doc) => {
    batch.delete(doc.ref);
  });
  batch.update(docRef, {
    votesCount: admin.firestore.FieldValue.increment(req.body.vote * -1),
  });
  docRef.get().then((doc) => {
    const coinsDocRef = db.collection("coins").doc(doc.data().userID);
    batch.update(coinsDocRef, {
      coins: admin.firestore.FieldValue.increment(req.body.vote * -1),
    });
    batch.commit().then(() => {
      return res.send("1");
    });
  });
};
