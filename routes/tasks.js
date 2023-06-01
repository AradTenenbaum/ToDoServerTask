const {
  getAllTasks,
  addTask,
  setTaskCompletion,
  clearDoneTasks,
} = require("../services/task");

const router = require("express").Router();

router.get("/all", getAllTasks);

router.post("/add", addTask);

router.put("/set-completion/:id", setTaskCompletion);

router.post("/clear", clearDoneTasks);

module.exports = router;
