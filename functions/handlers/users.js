const { db, admin } = require("../util/admin");
const firebase = require("firebase");
const config = require("../util/config");
const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require("../util/validators");
const { error } = require("firebase-functions/lib/logger");

firebase.initializeApp(config);
// ====================== signup
exports.signup = async (req, res) => {
  const newUser = {
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    name: req.body.name,
  };
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);
  await admin
    .auth()
    .getUserByEmail(newUser.email)
    .then((user) => {
      return res.status(400).json({ email: "this email is already taken" });
    })
    .catch(async (err) => {
      if (err.code === "auth/user-not-found") {
        // User doesn't exist yet, create it...
        const noImg = "no-img.png";
        await admin
          .auth()
          .createUser({
            email: newUser.email,
            emailVerified: false,
            password: newUser.password,
            displayName: newUser.name,
            photoURL: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
            disabled: false,
          })
          .then(async (userRecord) => {
            db.doc("/coins/" + userRecord.uid).set({ coins: 9999999 });
            firebase
              .auth()
              .signInWithEmailAndPassword(newUser.email, newUser.password)
              .then((data) => {
                return data.user.getIdToken();
              })
              .then((token) => {
                return res.json({ 
                  token,
                  email: userRecord.email,
                  displayName: userRecord.displayName,
                  photoURL: userRecord.photoURL,
                });
              })
              .catch((err) => {
                console.log("else==========");
                console.error(err);
                return res.status(500).json({ error: err.code });
              });
            console.log(userRecord);
            console.log("Successfully created new user:", userRecord.uid);
          })
          .catch((error) => {
            res.status(400).json(error);

            console.log("Error creating new user:" + error.code);
          });
      } else {
        res.status(500).json({ error: err.code });
      }
    });
};
// =============== login
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(async(data) => {
      return {
        token: await data.user.getIdToken(),
        email:  data.user.email,
        displayName:  data.user.displayName,
        photoURL:  data.user.photoURL,
      };
    })
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
// ========================= get user data
exports.getUserData = (req, res) => {
  admin
    .auth()
    .getUser(req.user.uid)
    .then((userRecord) => {
      return res.json(userRecord);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// ================
exports.checkIsAdmin = (req, res) => {
  return res.json(req.user.admin);
};
