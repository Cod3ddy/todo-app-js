const mongoose = require("../database/mongoose");

const taskSchema = new mongoose.Schema({
  task: String,
  timeStamp: Number,
  status: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
