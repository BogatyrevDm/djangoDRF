import React from "react";

const TodoItem = ({ todo }) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.active}
            </td>

        </tr>
    )
}


const TodoList = ({ todos }) => {
    return (
        <table>
            <th>
                Todo text
            </th>
            <th>
                Project
            </th>
            <th>
                User
            </th>
            <th>
                Active
            </th>
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default TodoList
