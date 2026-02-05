const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
router.get("/user-task", authMiddleware, getTask);
router.post("/post-task", authMiddleware, createTask);
router.put("/update-task/:id", authMiddleware, updateTask);
router.delete("/delete-task/:id", authMiddleware, deleteTask);
module.exports = router;
