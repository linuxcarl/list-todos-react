import React from "react";
import { AppUi } from "./AppUi";

const defaultTodos = [
  { text: "Rappi Mèxico", completed: true },
  { text: "Tomar el cursso de intro a React", completed: false },
  { text: "Descansar", completed: false },
  { text: "Storybook", completed: false },
];

function useLocalStorage(itemName, initialValue){
  const localStorageItem = localStorage.getItem(itemName)
  let parsedItem;

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue))
    parsedItem = initialValue
  } else {
    parsedItem = JSON.parse(localStorageItem)
  }
  const [item, setItem] = React.useState(parsedItem);

  const saveItem = (newTodos) =>{
    const stringifiedTodos = JSON.stringify(newTodos)
    localStorage.setItem(itemName, stringifiedTodos)
    setItem(newTodos)
  }

  return [
    item, saveItem
  ]
}
function App() {
  
  const [todos, saveItem] = useLocalStorage('TODOS_V1',[])
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
    saveItem(newTodos);
  };
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveItem(newTodos);
  };
  return (
    <AppUi
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
