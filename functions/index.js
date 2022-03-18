const functions = require("firebase-functions");
const app = require("express")();
const { makeAdmin } = require("./handlers/admin/users");
const { addGroup } = require("./handlers/admin/groups");
const fbAdminAuth = require("./util/fbAdminAuth");
const fbAuth = require("./util/fbAuth");
const questionsRouter = require("./routes/questions");
const answersRouter = require("./routes/answers");
const usersRouter = require("./routes/users");
const votesRouter = require("./routes/votes");
const { getGroup } = require("./handlers/groups");

// ************** public **********************
// ============== user

app.use("/users", usersRouter);
// ================== questions
app.use("/questions", questionsRouter);
app.use("/answers", answersRouter);
app.use("/votes", votesRouter);
// ************** admin **********************
// ============== user
app.post("/admin/makeAdmin", fbAuth, fbAdminAuth, makeAdmin);
app.post("/groups/add", fbAuth, fbAdminAuth, addGroup);
app.get("/groups/get", getGroup);

exports.api = functions.region("europe-west1").https.onRequest(app);
