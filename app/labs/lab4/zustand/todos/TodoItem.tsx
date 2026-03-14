"use client";
import { Button, ListGroupItem } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function TodoItem(todo: { id: string; title: string }) {
  const { setTodo, deleteTodo } = useTodoStore();

  return (
    <ListGroupItem key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
      {todo.title}
      <div>
        <Button onClick={() => setTodo(todo)}
                id="wd-set-todo-click"
                className="ms-2 btn btn-primary"> Edit </Button>
        <Button onClick={() => deleteTodo(todo.id)}
                id="wd-delete-todo-click"
                className="ms-2 btn btn-danger"> Delete </Button>
      </div>
    </ListGroupItem>
  );
}