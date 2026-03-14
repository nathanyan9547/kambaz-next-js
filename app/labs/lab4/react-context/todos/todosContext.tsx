"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Todo { id: string, title: string }

// Define the context state
interface TodosContextState {
  todos: Todo[]
  todo: Todo
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
  setTodo: (todo: Todo) => void;
}


// Create the context
const TodosContext = createContext<TodosContextState | undefined>(
  undefined,
);


// Create the provider component
export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);

  const [todo, setTodo] = useState<Todo>({ id: "-1", title: "Learn Mongo" })

  const addTodo = (t: Todo) => {
    setTodos([...todos, { ...t, id: new Date().getTime().toString() }]);
    setTodo({ id: "-1", title: "" })
  }
  const deleteTodo = (id: string) => setTodos(todos.filter((t) => t.id !== id));
  const updateTodo = (todo: Todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t))) // only update relevant id
    setTodo({ id: "-1", title: "" })
  }

  const value: TodosContextState = {
    todos,
    todo,
    addTodo,
    deleteTodo,
    updateTodo,
    setTodo
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  )
}

// Create a custom hook to use the counter context
export const useTodos = () => {
 const context = useContext(TodosContext);
 return context!;
};
