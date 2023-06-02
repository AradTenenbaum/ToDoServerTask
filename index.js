const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const taskRoute = require("./routes/tasks");

const app = express();

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
    allowedHeaders: ["Content-Type"],
    // optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/user", (req, res) => {
  const userId = req.cookies?.userId || uuidv4();
  res.cookie("userId", userId).send({ id: userId });
});

app.use("/task", taskRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
