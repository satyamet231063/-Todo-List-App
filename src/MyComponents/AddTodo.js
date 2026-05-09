import React, { useState } from 'react';

export const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");


    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Title or Description cannot be blank");
        }
        else {
            addTodo(title, desc);
            setTitle("");
            setDesc("");
        }
    }
    return (
        <div className="container my-4">
  <div className="card shadow-sm p-4">
    <h4 className="mb-3 text-center">Add a Todo</h4>

    <form onSubmit={submit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control mb-3"
        placeholder="Enter Title"
      />

      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="form-control mb-3"
        placeholder="Enter Description"
      />

      <button type="submit" className="btn btn-success w-100">
        Add Todo
      </button>
    </form>
  </div>
</div>
    )
}