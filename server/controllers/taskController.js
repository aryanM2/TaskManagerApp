const tasks = require("../models/task");

exports.getTask = async (req, res) => {
  try {
    const taskList = await tasks.find({ user: req.userId });
    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = new tasks({
      title,
      description,
      status,
      user: req.userId,
    });
    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await tasks.findOne({ _id: id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await tasks.findOneAndDelete({ _id: id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
