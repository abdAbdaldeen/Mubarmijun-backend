const { db, admin } = require("../util/admin");

exports.report = async (req, res) => {
  if (req.body.docID) {
    try {
      let checkReportRes = await checkReport(req);
      if (!checkReportRes) {
        await addReport(req);
        return res.json({reported:1});
      } else {
        await removeReport(req);
        return res.json({reported:0});
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "somethig went wrong" });
    }
  } else {
    res.status(404).json({ error: "docID not found" });
  }
};
const checkReport = async (req) => {
  return await db
    .collection("reports")
    .where("docID", "==", req.body.docID)
    .where("userID", "==", req.user.uid)
    .get()
    .then(async (snapshot) => {
      return !snapshot.empty;
    });
};
const addReport = async (req) => {
  const docRef = db.collection(req.body.collection).doc(req.body.docID);
  const batch = db.batch();
  batch.update(docRef, {
    reportsCount: admin.firestore.FieldValue.increment(1),
  });
  // ==============
  await batch.commit().then(() => {
    db.collection("reports").add({
      docID: req.body.docID,
      userID: req.user.uid,
    });
  });
};

const removeReport = async (req) => {
  const batch = db.batch();
  const docRef = db.collection(req.body.collection).doc(req.body.docID);
  const reports = await db
    .collection("reports")
    .where("docID", "==", req.body.docID)
    .where("userID", "==", req.user.uid)
    .get();
  reports.forEach((doc) => {
    batch.delete(doc.ref);
  });
  batch.update(docRef, {
    reportsCount: admin.firestore.FieldValue.increment(-1),
  });
  return await batch.commit();
};
