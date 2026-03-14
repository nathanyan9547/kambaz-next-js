"use client";
import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { useTodos } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos } = useTodos();

  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup className="list-group">
        <TodoForm />
        {todos.map((todo) => (
          <TodoItem key={todo.id} id={todo.id} title={todo.title} />
        ))}
      </ListGroup><hr/>
    </div>
  );
}