const { db } = require("./admin");

exports.checkVote = async (docID,uid) => {
  let vote = 0;
  let snapshot = await db.collection("votes")
    .where("docID", "==", docID)
    .where("userID", "==", uid)
    .get()
    if (snapshot.empty) {
      return 0;
    }
    snapshot.forEach((doc) => {
      vote = doc.data().vote;
    });
    return vote;
};