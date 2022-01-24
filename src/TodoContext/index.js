import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage(
    "TODOS_V1",
    []
  );
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false)

  let searchTodos = [];
  if (!searchValue >= 1) {
    searchTodos = todos;
  } else {
    searchTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchTodo = searchValue.toLowerCase();
      return todoText.includes(searchTodo);
    });
  }
  const completedTodo = searchTodos.filter((r) => !!r.completed).length;
  const totalTodos = searchTodos.length;

  const addTodo = (text ) => {
    const newTodos = [...todos];
    newTodos.push({
      completed:false,
      text
    })
    saveTodos(newTodos);
  };
  
  const completeTodo = (text, status = true) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = status;
    saveTodos(newTodos);
  };
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };
  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        completedTodo,
        totalTodos,
        searchValue,
        setSearchValue,
        searchTodos,
        addTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
