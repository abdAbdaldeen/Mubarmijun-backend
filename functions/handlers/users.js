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
      return res.status(400).json({ error: "البريد الإلكتروني مستخدم بالفعل" });
    })
    .catch(async (err) => {
      if (err.code === "auth/user-not-found") {
        // User doesn't exist yet, create it...
        // const noImg = "no-img.png";
        await admin
          .auth()
          .createUser({
            email: newUser.email,
            emailVerified: false,
            password: newUser.password,
            displayName: newUser.name,
            // photoURL: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
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
                console.error(err);
                return res.status(500).json({ error: "عذرا لقد حدث خطأ غير معروف، يرجى المحاولة مرة أخرى", errorCode: err.code });
              });
            console.log(userRecord);
            console.log("Successfully created new user:", userRecord.uid);
          })
          .catch((error) => {
            return res.status(500).json({ error: "عذرا لقد حدث خطأ غير معروف، يرجى المحاولة مرة أخرى", errorCode: error.code });
          });
      } else {
        return res.status(500).json({ error: "عذرا لقد حدث خطأ غير معروف، يرجى المحاولة مرة أخرى", errorCode: err.code });
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
      let token = await data.user.getIdToken()
      let isAdmin = await data.user.getIdTokenResult().then(idTokenResult => {
        return idTokenResult.claims.admin
      });

      return {
        token,
        email:  data.user.email,
        displayName:  data.user.displayName,
        photoURL:  data.user.photoURL,
        isAdmin,
      };
    })
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error(err);
      let errorMsg = ""
      if (err.code === "auth/wrong-password") {
        errorMsg = "كلمة المرور غير صحيحة"
      } else if (err.code === "auth/user-not-found") {
        errorMsg = "البريد الإلكتروني غير صحيح"
      } else if (err.code === "auth/too-many-requests") {
        errorMsg = "تم تعطيل الوصول إلى هذا الحساب مؤقتًا بسبب العديد من محاولات تسجيل الدخول الفاشلة. يمكنك استعادتها على الفور عن طريق إعادة تعيين كلمة المرور الخاصة بك أو يمكنك المحاولة مرة أخرى لاحقًا."
      } 
       else {
        return res.status(500).json({ error: "عذرا لقد حدث خطأ غير معروف، يرجى المحاولة مرة أخرى" });
      }
      return res.status(400).json({ error: errorMsg });
    });
};
// ========================= get user data
exports.getUserData = async (req, res) => {
  await admin
    .auth()
    .getUser(req.user.uid)
    .then(async(userRecord) => {
      await db.doc("/coins/" + userRecord.uid)
      .get()
      .then(doc=>{
        return res.json({...userRecord, coins:doc.data().coins});
      })
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
