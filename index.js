const express = require("express");
const cors = require("cors");

const taskRoute = require("./routes/tasks");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/task", taskRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
