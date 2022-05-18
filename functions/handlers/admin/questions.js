const { db, admin } = require("../../util/admin");
const { getDate } = require("../../util/common");
// const { getUserId } = require("../util/fbAuth");
const { checkVote } = require("../../util/votes");
// ============================================================
// {
//   "echo-و-print": {
//       "qID": "echo-و-print",
//       "createdAt": "8 مايو 2022",
//       "userID": "ddLt751v9oQyo4a8iQYLSVWbKaH3",
//       "groupID": "PHP",
//       "body": "<p>ما الفرق بينهم في طباعة الجمل </p><p><br></p>",
//       "reportsCount": 0,
//       "votesCount": 0,
//       "title": "echo و print",
//       "userRecord": {
//           "uid": "ddLt751v9oQyo4a8iQYLSVWbKaH3",
//           "email": "user@user.com",
//           "emailVerified": false,
//           "displayName": "user",
//           "disabled": false,
//           "metadata": {
//               "lastSignInTime": "Tue, 10 May 2022 16:28:10 GMT",
//               "creationTime": "Thu, 28 Apr 2022 15:24:05 GMT"
//           },
//           "tokensValidAfterTime": "Thu, 28 Apr 2022 15:24:05 GMT",
//           "providerData": [
//               {
//                   "uid": "user@user.com",
//                   "displayName": "user",
//                   "email": "user@user.com",
//                   "providerId": "password"
//               }
//           ]
//       }
//   },
//   "عنوان-اختبار-2": {
//       "qID": "عنوان-اختبار-2",
//       "title": "عنوان اختبار 2",
//       "reportsCount": 0,
//       "groupID": "PHP",
//       "userID": "gB0v8lBKCjX4Q8ciShVjRXqXNz93",
//       "createdAt": "21 أبريل 2022",
//       "votesCount": 1,
//       "body": "<p class=\"ql-align-right\"><span style=\"background-color: rgb(255, 255, 102);\">عنوان اختبار 2</span></p>",
//       "userRecord": {
//           "uid": "gB0v8lBKCjX4Q8ciShVjRXqXNz93",
//           "email": "2abd@abd.com",
//           "emailVerified": false,
//           "displayName": "test",
//           "disabled": false,
//           "metadata": {
//               "lastSignInTime": "Mon, 25 Apr 2022 00:29:32 GMT",
//               "creationTime": "Sun, 20 Mar 2022 18:08:59 GMT"
//           },
//           "tokensValidAfterTime": "Sun, 20 Mar 2022 18:08:59 GMT",
//           "providerData": [
//               {
//                   "uid": "2abd@abd.com",
//                   "displayName": "test",
//                   "email": "2abd@abd.com",
//                   "providerId": "password"
//               }
//           ]
//       }
//   },
//   "tzGQN9v7un82Rdw68gGe": {
//       "qID": "tzGQN9v7un82Rdw68gGe",
//       "groupID": "PHP",
//       "userID": "gB0v8lBKCjX4Q8ciShVjRXqXNz93",
//       "createdAt": "21 أبريل 2022",
//       "votesCount": 0,
//       "body": "<h2>عنوان اختبار 1</h2><p>عنوان اختبار 1</p>",
//       "reportsCount": 0,
//       "title": "عنوان اختبار 1",
//       "userRecord": {
//           "uid": "gB0v8lBKCjX4Q8ciShVjRXqXNz93",
//           "email": "2abd@abd.com",
//           "emailVerified": false,
//           "displayName": "test",
//           "disabled": false,
//           "metadata": {
//               "lastSignInTime": "Mon, 25 Apr 2022 00:29:32 GMT",
//               "creationTime": "Sun, 20 Mar 2022 18:08:59 GMT"
//           },
//           "tokensValidAfterTime": "Sun, 20 Mar 2022 18:08:59 GMT",
//           "providerData": [
//               {
//                   "uid": "2abd@abd.com",
//                   "displayName": "test",
//                   "email": "2abd@abd.com",
//                   "providerId": "password"
//               }
//           ]
//       }
//   },
//   "t6j4kDpOdlNFMYt2xmej": {
//       "qID": "t6j4kDpOdlNFMYt2xmej",
//       "groupID": "git",
//       "reportsCount": 0,
//       "votesCount": 0,
//       "title": "عنوان عنوان عنوان",
//       "body": "",
//       "userID": "dRKkUBbiMueaMZWyH2cRWXJ2Y7L2",
//       "createdAt": "19 أبريل 2022",
//       "userRecord": {
//           "uid": "dRKkUBbiMueaMZWyH2cRWXJ2Y7L2",
//           "email": "malak@gmail.com",
//           "emailVerified": false,
//           "displayName": "malak",
//           "disabled": false,
//           "metadata": {
//               "lastSignInTime": "Tue, 10 May 2022 18:07:18 GMT",
//               "creationTime": "Sun, 20 Mar 2022 18:26:03 GMT"
//           },
//           "customClaims": {
//               "admin": true
//           },
//           "tokensValidAfterTime": "Sun, 20 Mar 2022 18:26:03 GMT",
//           "providerData": [
//               {
//                   "uid": "malak@gmail.com",
//                   "displayName": "malak",
//                   "email": "malak@gmail.com",
//                   "providerId": "password"
//               }
//           ]
//       }
//   },
//   "M4qNYbsd4iGT8Xdd0qV9": {
//       "qID": "M4qNYbsd4iGT8Xdd0qV9",
//       "title": "echo و print",
//       "body": "ما الفرق بين echo و print في طباعة الجمل ب كود php\nمع ان استخدام كلتا الكلمتين يعطي نفس الناتج ",
//       "groupID": "PHP",
//       "createdAt": "28 مارس 2022",
//       "reportsCount": 0,
//       "userID": "3eE2Tm95awOBNo1WBzKABxqF7D13",
//       "votesCount": 1,
//       "userRecord": {
//           "uid": "3eE2Tm95awOBNo1WBzKABxqF7D13",
//           "email": "user@gmail.com",
//           "emailVerified": false,
//           "displayName": "user ",
//           "disabled": false,
//           "metadata": {
//               "lastSignInTime": "Tue, 29 Mar 2022 19:36:10 GMT",
//               "creationTime": "Mon, 28 Mar 2022 16:11:15 GMT"
//           },
//           "tokensValidAfterTime": "Mon, 28 Mar 2022 16:11:15 GMT",
//           "providerData": [
//               {
//                   "uid": "user@gmail.com",
//                   "displayName": "user ",
//                   "email": "user@gmail.com",
//                   "providerId": "password"
//               }
//           ]
//       }
//   },
//   "dMPHw46kymOAbjs7VrLx": {
//       "qID": "dMPHw46kymOAbjs7VrLx",
//       "reportsCount": 0,
//       "votesCount": 0,
//       "groupID": "git",
//       "title": " pull request ",
//       "userID": "3eE2Tm95awOBNo1WBzKABxqF7D13",
//       "createdAt": "28 مارس 2022",
//       "body": "ماذا يعني ال pull request ؟ و ما هو الفرق بين ال pull و ال pull request ؟",
//       "userRecord": {
//           "uid": "3eE2Tm95awOBNo1WBzKABxqF7D13",
//           "email": "user@gmail.com",
//           "emailVerified": false,
//           "displayName": "user ",
//           "disabled": false,
//           "metadata": {
//               "lastSignInTime": "Tue, 29 Mar 2022 19:36:10 GMT",
//               "creationTime": "Mon, 28 Mar 2022 16:11:15 GMT"
//           },
//           "tokensValidAfterTime": "Mon, 28 Mar 2022 16:11:15 GMT",
//           "providerData": [
//               {
//                   "uid": "user@gmail.com",
//                   "displayName": "user ",
//                   "email": "user@gmail.com",
//                   "providerId": "password"
//               }
//           ]
//       }
//   },
//   "D1nliU1mFmAnmqhsxXoI": {
//       "qID": "D1nliU1mFmAnmqhsxXoI",
//       "reportsCount": 0,
//       "title": "كيف من المم",
//       "votesCount": 0,
//       "userID": "3eE2Tm95awOBNo1WBzKABxqF7D13",
//       "createdAt": "28 مارس 2022",
//       "groupID": "",
//       "body": "",
//       "userRecord": {
//           "uid": "3eE2Tm95awOBNo1WBzKABxqF7D13",
//           "email": "user@gmail.com",
//           "emailVerified": false,
//           "displayName": "user ",
//           "disabled": false,
//           "metadata": {
//               "lastSignInTime": "Tue, 29 Mar 2022 19:36:10 GMT",
//               "creationTime": "Mon, 28 Mar 2022 16:11:15 GMT"
//           },
//           "tokensValidAfterTime": "Mon, 28 Mar 2022 16:11:15 GMT",
//           "providerData": [
//               {
//                   "uid": "user@gmail.com",
//                   "displayName": "user ",
//                   "email": "user@gmail.com",
//                   "providerId": "password"
//               }
//           ]
//       }
//   },
//   "ZuqOjmr8ggflsk8wl2vm": {
//       "qID": "ZuqOjmr8ggflsk8wl2vm",
//       "body": "",
//       "userID": "3eE2Tm95awOBNo1WBzKABxqF7D13",
//       "createdAt": "28 مارس 2022",
//       "groupID": "",
//       "reportsCount": 0,
//       "title": "كيف من المم",
//       "votesCount": 0,
//       "userRecord": {
//           "uid": "3eE2Tm95awOBNo1WBzKABxqF7D13",
//           "email": "user@gmail.com",
//           "emailVerified": false,
//           "displayName": "user ",
//           "disabled": false,
//           "metadata": {
//               "lastSignInTime": "Tue, 29 Mar 2022 19:36:10 GMT",
//               "creationTime": "Mon, 28 Mar 2022 16:11:15 GMT"
//           },
//           "tokensValidAfterTime": "Mon, 28 Mar 2022 16:11:15 GMT",
//           "providerData": [
//               {
//                   "uid": "user@gmail.com",
//                   "displayName": "user ",
//                   "email": "user@gmail.com",
//                   "providerId": "password"
//               }
//           ]
//       }
//   },
//   "FFUY5fQZE4HnNdlBiN36": {
//       "qID": "FFUY5fQZE4HnNdlBiN36",
//       "votesCount": 0,
//       "userID": "dRKkUBbiMueaMZWyH2cRWXJ2Y7L2",
//       "groupID": "git",
//       "createdAt": "26 مارس 2022",
//       "reportsCount": 0,
//       "title": "الفرق بين pull و push",
//       "body": "االسلام عليكم \nما هو الفرق بين pull و push في git؟؟",
//       "userRecord": {
//           "uid": "dRKkUBbiMueaMZWyH2cRWXJ2Y7L2",
//           "email": "malak@gmail.com",
//           "emailVerified": false,
//           "displayName": "malak",
//           "disabled": false,
//           "metadata": {
//               "lastSignInTime": "Tue, 10 May 2022 18:07:18 GMT",
//               "creationTime": "Sun, 20 Mar 2022 18:26:03 GMT"
//           },
//           "customClaims": {
//               "admin": true
//           },
//           "tokensValidAfterTime": "Sun, 20 Mar 2022 18:26:03 GMT",
//           "providerData": [
//               {
//                   "uid": "malak@gmail.com",
//                   "displayName": "malak",
//                   "email": "malak@gmail.com",
//                   "providerId": "password"
//               }
//           ]
//       }
//   },
//   "عنوان-عنوان-عنوان": {
//       "qID": "عنوان-عنوان-عنوان",
//       "body": "11111111111111\nخسائر اللازمة ومطالبة حدة بل. الآخر الحلفاء أن غزو, إجلاء وتنامت عدد مع. لقهر معركة لبلجيكا، بـ انه, ربع الأثنان المقيتة في, اقتصّت المحور حدة و. هذه ما طرفاً عالمية استسلام, الصين وتنامت حين ٣٠, ونتج والحزب المذابح كل جوي. أسر كارثة المشتّتون بل, وبعض وبداية الصفحة غزو قد, أي بحث تعداد الجنوب.قصف المسرح واستمر الإتحاد في, ذات أسيا للغزو، الخطّة و, الآخر لألمانيا جهة بل. في سحقت هيروشيما البريطاني يتم, غريمه باحتلال الأيديولوجية، في فصل, دحر وقرى لهيمنة الإيطالية ٣٠. استبدال استسلام القاذفات عل مما. ببعض مئات وبلجيكا، قد أما, قِبل الدنمارك حتى كل, العمليات اليابانية انه أن.حتى هاربر موسكو ثم, وتقهقر المنتصرة حدة عل, التي فهرست واشتدّت أن أسر. كانت المتاخمة التغييرات أم وفي. ان وانتهاءً باستحداث قهر. ان ضمنها للأراضي الأوروبية ذات.حشد الثقيل المنتصر ثم, أسر قررت تم. وغير تصفح الحزب واستمر, مشروط الساحلية هذا ان. أما معركة لبلجيكا، من, الألوف الثقيلة الإنجليزية أسر ٣٠. ٣٠ دار أمام أحدث, أما بحشد الهادي الدولارات ما, هو الحزب الصفحة محاولات قبل. وبحلول الخنادق الأوروبية، ان غير, وليرتفع برلين، انه, انتباه الوزراء البولندي تم تلك.كما أن وقام وبدأت, لم أدوات للمجهود بلا. إذ لها الأول الستار, تحت وصغار مدينة عل. أي بحشد ليرتفع الساحلية أما, ليركز الهادي للأسطول ما هذا, أسابيع الروسية وتم عن. وفي مع شدّت فكان أدوات. سمّي تعداد ونستون هذا ما. به، بـ الخاصّة هيروشيما, وربع جندي الشهير الساحل.",
//       "groupID": "PHP",
//       "title": "عنوان عنوان عنوان",
//       "userID": "gB0v8lBKCjX4Q8ciShVjRXqXNz93",
//       "votesCount": 5,
//       "createdAt": "25 مارس 2022",
//       "reportsCount": 0,
//       "userRecord": {
//           "uid": "gB0v8lBKCjX4Q8ciShVjRXqXNz93",
//           "email": "2abd@abd.com",
//           "emailVerified": false,
//           "displayName": "test",
//           "disabled": false,
//           "metadata": {
//               "lastSignInTime": "Mon, 25 Apr 2022 00:29:32 GMT",
//               "creationTime": "Sun, 20 Mar 2022 18:08:59 GMT"
//           },
//           "tokensValidAfterTime": "Sun, 20 Mar 2022 18:08:59 GMT",
//           "providerData": [
//               {
//                   "uid": "2abd@abd.com",
//                   "displayName": "test",
//                   "email": "2abd@abd.com",
//                   "providerId": "password"
//               }
//           ]
//       }
//   }
// }
exports.getQuestions = async (req, res) => {
  let data = {};
  try {
    if (!req.query.key) {
      data = await db
        .collection("questions")
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
    } else {
      data = await db
        .collection("questions")
        .orderBy("createdAt", "desc")
        .startAfter(req.query.key)
        .limit(10)
        .get();
    }
    let questions = {};
    let lastKey = "";
    await Promise.all(
      data.docs.map(async (qDoc) => {
        data.forEach((doc) => {
          questions[doc.id] = {
            qID: doc.id,
            ...doc.data(),
            createdAt: getDate(doc.data().createdAt),
          };
          lastKey = doc.data().createdAt;
        });
        // ====== get question owner data
        await admin
          .auth()
          .getUser(qDoc.data().userID)
          .then((userRecord) => {
            questions[qDoc.id].userRecord = userRecord;
          })
          .catch((error) => {
            questions[qDoc.id].userRecord = {};
          });
      })
    );
    return res.json({ questions, lastKey });
  } catch (error) {
    res.status(500).json({ error: "somethig went wrong" });
    console.error(error);
  }
};
// ======== search
exports.getOne = async (req, res) => {
  try {
    let doc = await db.collection("questions").doc(req.query.qID).get();
    let question = doc.data();
    question.qID = doc.id;
    await admin
      .auth()
      .getUser(question.userID)
      .then((userRecord) => {
        question.userRecord = userRecord;
      })
      .catch((error) => {
        question.userRecord = {};
      });
    return res.json({ question });
  } catch (error) {
    res.status(500).json({ error: "somethig went wrong" });
    console.error(error);
  }
};
// ============================================================
exports.deleteQ = (req, res) => {
  let qDoc = db.collection("questions").doc(req.body.qID);
  qDoc
    .delete()
    .then(() => {
      return res.json("Successfully delete question");
    })
    .catch((err) => {
      res.status(500).json({ error: "somethig went wrong" });
      console.error(err);
    });
};
