import './App.css';
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [todos, setTodos] = useState([]);

  // 🔹 Fetch todos from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err));
  }, []);

  // 🔹 Add Todo
  const addTodo = async (title, desc) => {
    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        desc: desc,
        completed: false
      }),
    });

    const data = await res.json();
    setTodos([...todos, data]);
  };

  // 🔹 Delete Todo
  const onDelete = async (todo) => {
    await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
      method: "DELETE",
    });

    setTodos(todos.filter((e) => e._id !== todo._id));
  };

  // 🔹 Toggle Complete
  const toggleComplete = async (todo) => {
    const res = await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });

    const updated = await res.json();

    setTodos(
      todos.map((item) =>
        item._id === updated._id ? updated : item
      )
    );
  };

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={false} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddTodo addTodo={addTodo} />
                <Todos
                  todos={todos}
                  onDelete={onDelete}
                  toggleComplete={toggleComplete}
                />
              </>
            }
          />

          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;