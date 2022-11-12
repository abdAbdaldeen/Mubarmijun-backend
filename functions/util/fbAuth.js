const { admin, db } = require("./admin");

module.exports = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      if (req.query.getUserData) {
        admin
          .auth()
          .getUser(decodedToken.uid)
          .then((userRecord) => {
            req.user = userRecord
            return next();
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
          });
        }else{
        req.user = decodedToken;
        return next();
      }
    })
    .catch((err) => {
      console.error("Error while verifying ", err);
      return res.status(403).json(err);
    });
};

exports.getUserId = async (req) =>{
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    return false;
  }
  return await admin
    .auth()
    .verifyIdToken(idToken)
    .catch((err) => {
      return false;
    });
}