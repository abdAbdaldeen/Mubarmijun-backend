const { db, admin } = require("../../util/admin");

// ============================================================
// toggle hide and show Docs
exports.hideDoc = (req, res) => {
  let qDoc = db.collection(req.body.collection).doc(req.body.dID);
  let reportsCount = req.body.reportsCount < 10 ? 1000 : 0;
  qDoc
    .update({
      reportsCount,
    })
    .then(() => {
      return res.json(1);
    })
    .catch((err) => {
      res.status(500).json({ error: "somethig went wrong" });
      console.error(err);
    });
};

exports.blockUser = async (req, res) => {
  console.log(!!req.query.value);
  await admin
    .auth()
    .updateUser(req.query.uid, {
      disabled: !req.query.value,
    })
    .then(() => {
      return res.json(1);
    })
    .catch((err) => {
      res.status(500).json({ error: "somethig went wrong" });
      console.error(err);
    });
};

exports.deleteDoc = (req, res) => {
  let qDoc = db.collection(req.body.collection).doc(req.body.docID);
  qDoc
    .delete()
    .then(() => {
      return res.json("Successfully deleted");
    })
    .catch((err) => {
      res.status(500).json({ error: "somethig went wrong" });
      console.error(err);
    });
};