import React from 'react'

export const TodoItem = ({todo, onDelete}) => {
    return (
        <>
        <div className="card my-3 shadow-sm">
  <div className="card-body d-flex justify-content-between align-items-center">

    <div>
      <h5 className="mb-1">{todo.title}</h5>
      <p className="text-muted mb-0">{todo.desc}</p>
    </div>

    <button 
      className="btn btn-danger btn-sm"
      onClick={() => onDelete(todo)}
    >
      Delete
    </button>

  </div>
</div>
        <hr/> 
        </>
    )
}
