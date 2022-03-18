const { admin } = require("../../util/admin");

exports.makeAdmin = (req, res) => {
  admin
    .auth()
    .getUserByEmail(req.body.email)
    .then(function (userRecord) {
      admin
        .auth()
        .setCustomUserClaims(userRecord.uid, { admin: true })
        .then(() => {
          return res.send(`تمت اضافة ${userRecord.displayName} كمشرف بنجاح`);
        });
    })
    .catch((error) => {
      res.status(400).json(error);
      console.log("Error :" + error.code);
    });
};
