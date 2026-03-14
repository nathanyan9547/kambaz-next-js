"use client";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos } = useTodoStore();

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