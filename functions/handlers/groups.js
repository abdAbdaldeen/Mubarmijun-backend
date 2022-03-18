const { db } = require("../util/admin");

exports.getGroup = async (req, res) => {
  db.collection("groups")
    .get()
    .then((data) => {
      let groups = [];
      data.forEach((doc) => {
        groups.push({
          gID: doc.id,
          ...doc.data(),
        });
      });
      return res.json(groups);
    })
    .catch((err) => {
      res.status(500).json({ error: "somethig went wrong" });
      console.error(err);
    });
};
