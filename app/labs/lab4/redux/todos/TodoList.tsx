import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);

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