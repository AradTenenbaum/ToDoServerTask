let tasks = [];

const getAllTasks = (req, res) => {
  const userId = req.cookies?.userId;
  if (!userId) {
    res.status(403).end();
    return;
  }
  return res.send(tasks);
};

const addTask = (req, res) => {
  try {
    const userId = req.cookies?.userId;
    if (!userId) {
      res.status(403).end();
      return;
    }
    if (!req.body.text || (req.body.text && req.body.text.length === 0)) {
      return res
        .status(400)
        .send({ error: "cannot add a task with empty text" });
    }
    const newTask = {
      text: req.body.text,
      isDone: false,
      timestamp: new Date(Date.now()),
    };
    tasks.push(newTask);
    return res.send({ ...newTask, id: tasks.length - 1 });
  } catch (error) {
    return res.status(400).send({ error: "an error occurred" });
  }
};

const setTaskCompletion = (req, res) => {
  try {
    const userId = req.cookies?.userId;
    if (!userId) {
      res.status(403).end();
      return;
    }
    const id = req.params.id;
    if (id >= tasks.length)
      return res.status(400).send({ error: "id not exists" });

    tasks[id].isDone = !tasks[id].isDone;
    return res.send({ id });
  } catch (error) {
    return res.status(400).send({ error: "an error occurred" });
  }
};

const clearDoneTasks = (req, res) => {
  try {
    const userId = req.cookies?.userId;
    if (!userId) {
      res.status(403).end();
      return;
    }
    tasks = tasks.filter((task) => !task.isDone);
    return res.send(tasks);
  } catch (error) {
    return res.status(400).send({ error: "an error occurred" });
  }
};

module.exports = { getAllTasks, addTask, setTaskCompletion, clearDoneTasks };
