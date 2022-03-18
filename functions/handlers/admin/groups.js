const { db } = require("../../util/admin");

exports.addGroup = async (req, res) => {
  const newGroup = {
    name: req.body.name,
    imgUrl: req.body.imgUrl,
  };
  db.collection("groups")
    .add(newGroup)
    .then((doc) => {
      const resGroup = newGroup;
      resGroup.gID = doc.id;
      res.json(resGroup);
    })
    .catch((err) => {
      res.status(500).json({ error: "somethig went wrong" });
      console.error(err);
    });
};
