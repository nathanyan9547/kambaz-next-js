import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="list-group-item d-flex justify-content-between align-items-center">
      <FormControl value={todo.title} className="w-50"
        onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }/>
      <div>
        <Button onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click"
                className="ms-2 btn btn-warning"> Update </Button>
        <Button onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click"
                className="ms-2 btn btn-success"> Add </Button>
      </div>
    </ListGroupItem>
);}
