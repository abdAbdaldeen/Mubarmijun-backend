const { db } = require("../../util/admin");

exports.addGroup = async (req, res) => {
  const newGroup = {
    name: req.body.name,
    imgUrl: req.body.imgUrl,
  };
  let id = newGroup.name.replace(/ /g, "-");
  db.collection("groups")
    .doc(id)
    .set(newGroup)
    .then(() => {
      res.json(newGroup);
    })
    .catch((err) => {
      res.status(500).json({ error: "somethig went wrong" });
      console.error(err);
    });
};
