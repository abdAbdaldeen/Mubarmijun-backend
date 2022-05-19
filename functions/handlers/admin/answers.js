const { db, admin } = require("../../util/admin");

exports.getQAnswers = async (req, res) => {
  await db
    .collection("answers")
    .where("questionID", "==", req.query.qID)
    .orderBy("votesCount", "desc")
    .get()
    .then((data) => {
      let answers = []
      data.forEach((doc) => {
        answers.push({
          aID:doc.id,
          disabled: 0,
          ...doc.data()
        })
      });
      // await Promise.all(
      //   data.docs.map(async (answerDoc) => {
      //     answers.push({
      //       aID:answerDoc.id,
      //     ...answerDoc.data()
      //     })
      //   })
      // );
      return res.json(answers)
    }).catch((err) => {
      res.status(500).json({ error: "somethig went wrong" });
      console.error(err);
    });
};
