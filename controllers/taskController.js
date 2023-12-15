const Task = require("../models/Task");
const User = require("../models/User");

async function getTasks(req, res) {
  try {
    const tasks = await Task.find({});
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function createTask(req, res) {
    try {
        const { name, description } = req.body;
        const task = await Task.create({ name, description });
        return res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

async function updateTask(req, res) {
    try {
        const { name, description } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ task });
    }catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

async function deleteTask(req, res) {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

async function addEmployeetoTask(req, res) {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.employees.push(user._id);
        await task.save();
        return res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

async function removeEmployeefromTask(req, res) {
    try {
        const user = await User.findById(req.body.username);
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.employees.pull(user._id);
        await task.save();
        return res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

async function endTask(req, res) {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.isCheckin = true;
        task.state = "completed";
        await task.save();
        return res.status(200).json({ task });
    } catch(error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    addEmployeetoTask,
    removeEmployeefromTask,
    endTask
}