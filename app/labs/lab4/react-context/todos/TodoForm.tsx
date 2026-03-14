"use client";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useTodos } from "./todosContext";

export default function TodoForm() {
  const { todo, setTodo, addTodo, updateTodo } = useTodos();

  return (
    <ListGroupItem className="list-group-item d-flex justify-content-between align-items-center">
      <FormControl value={todo.title} className="w-50"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
      <div>
        <Button onClick={() => updateTodo(todo)}
                id="wd-update-todo-click"
                className="ms-2 btn btn-warning"> Update </Button>
        <Button onClick={() => addTodo(todo)}
                id="wd-add-todo-click"
                className="ms-2 btn btn-success"> Add </Button>
      </div>
    </ListGroupItem>
  );
}