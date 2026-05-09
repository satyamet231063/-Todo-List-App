import React from 'react'
import { TodoItem } from "./TodoItem";

export const Todos = (props) => {
    let myStyle = {
        minHeight: "70vh",
        margin: "40px auto"
    }

    return (
        <div className="container" style={myStyle}>
            <h3 className="my-3">Todos List</h3>

            {props.todos.length === 0 ? (
                <h5 className="text-center text-muted my-5">
                    No Todos yet 🚀
                </h5>
            ) : (
                props.todos.map((todo) => {
                    return (
                        <TodoItem 
                            todo={todo} 
                            key={todo._id} 
                            onDelete={props.onDelete}
                        />
                    )
                })
            )}

        </div>
    )
}