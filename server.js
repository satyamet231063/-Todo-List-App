const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/todosDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const TodoSchema = new mongoose.Schema({
  title: String,
  desc: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// Test API
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working 🚀" });
});

/* ================== TODOS API ================== */

// GET all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD todo
app.post("/api/todos", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE todo
app.put("/api/todos/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================== SERVER ================== */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});