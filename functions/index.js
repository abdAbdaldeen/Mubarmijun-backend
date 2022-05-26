const functions = require("firebase-functions");
const app = require("express")();
const cors = require('cors');
const { makeAdmin, getUsers } = require("./handlers/admin/users");
const { addGroup } = require("./handlers/admin/groups");
const fbAdminAuth = require("./util/fbAdminAuth");
const fbAuth = require("./util/fbAuth");
const questionsRouter = require("./routes/questions");
const answersRouter = require("./routes/answers");
const usersRouter = require("./routes/users");
const votesRouter = require("./routes/votes");
const { getGroup } = require("./handlers/groups");
const { getQuestions, deleteQ, getOne } = require("./handlers/admin/questions");
const { hideDoc, blockUser, deleteDoc } = require("./handlers/admin/common");
const { getQAnswers } = require("./handlers/admin/answers");

app.use(cors({origin: true}))
// ************** public **********************
// ============== user

app.use("/users", usersRouter);
// ================== questions
app.use("/questions", questionsRouter);
app.use("/answers", answersRouter);
app.use("/votes", votesRouter);
// ************** admin **********************
// ============== user
app.post("/groups/add", fbAuth, fbAdminAuth, addGroup);
app.get("/groups/get", getGroup);
// dashboard
app.get("/admin/questions/get", fbAuth, fbAdminAuth, getQuestions);
app.post("/admin/questions/delete", fbAuth, fbAdminAuth, deleteQ);
app.get("/admin/questions/getOne", fbAuth, fbAdminAuth, getOne);

app.get("/admin/answers/get", fbAuth, fbAdminAuth, getQAnswers);


app.post("/admin/hideDoc", fbAuth, fbAdminAuth, hideDoc);
app.get("/admin/blockUser", fbAuth, fbAdminAuth, blockUser);
app.post("/admin/deleteDoc", fbAuth, fbAdminAuth, deleteDoc);

app.post("/admin/users/addAdmin", fbAuth, fbAdminAuth, makeAdmin);
app.get("/admin/users/get", fbAuth, fbAdminAuth, getUsers);


exports.api = functions.region("europe-west1").https.onRequest(app);
