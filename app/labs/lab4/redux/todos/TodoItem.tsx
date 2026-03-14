import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem( todo: { id: string; title: string } ) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
      {todo.title}
      <div>
        <Button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"
                className="ms-2 btn btn-primary"> Edit </Button>
        <Button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"
                className="ms-2 btn btn-danger"> Delete </Button>
      </div>
    </ListGroupItem>
);}