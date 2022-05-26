const { admin, db } = require("../../util/admin");

exports.makeAdmin = (req, res) => {
  if (req.body.uid) {
    admin
      .auth()
      .setCustomUserClaims(req.body.uid, { admin: !req.body.value })
      .then(() => {
        return res.send();
      })
      .catch((error) => {
        res.status(400).json(error);
        console.log("Error :" + error.code);
      });
  } else {
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
  }
};

exports.getUsers = async (req, res) => {
  let usersList = [];
  await admin
    .auth()
    .listUsers(20, req.query.nextPageToken)
    .then(async (listUsersResult) => {
      // listUsersResult.users.forEach((userRecord) => {
      //   let admin = !!userRecord.customClaims && userRecord.customClaims.admin
      //   usersList.push({ admin, ...userRecord });
      // });
      // res.json({ usersList, nextPageToken: listUsersResult.pageToken });
      // ===========
      await Promise.all(
        listUsersResult.users.map(async (userRecord) => {
          let coins = await db
            .doc("/coins/" + userRecord.uid)
            .get()
            .then((doc) => {
              return doc.data().coins;
            });
          let admin =
            !!userRecord.customClaims && userRecord.customClaims.admin;
          usersList.push({ admin, coins, ...userRecord });
        })
      );
      res.json({ usersList, nextPageToken: listUsersResult.pageToken });
    })
    .catch((error) => {
      res.status(400).json(error);
      console.log("Error :", error);
    });
};
