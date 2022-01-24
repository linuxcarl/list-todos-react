import React from "react";
import { AppUi } from "./AppUi";

// const defaultTodos = [
//   { text: "Rappi Mèxico", completed: true },
//   { text: "Tomar el cursso de intro a React", completed: false },
//   { text: "Descansar", completed: false },
//   { text: "Storybook", completed: false },
// ];

function useLocalStorage(itemName, initialValue) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

  console.log("loading=>", loading);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 2000);
  });

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };
  return { item, saveItem, loading , error};
}
function App() {
  const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage(
    "TODOS_V1",
    []
  );
  const [searchValue, setSearchValue] = React.useState("");

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
    <AppUi
      loading={loading}
      error={error}
      completedTodo={completedTodo}
      totalTodos={totalTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchTodos={searchTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
