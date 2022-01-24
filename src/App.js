import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { CreateTodoButton } from "./CreateTodoButton";
// import './App.css';

const defaultTodos = [
  { text: "Rappi Mèxico", completed: true },
  { text: "Tomar el cursso de intro a React", completed: false },
  { text: "Descansar", completed: false },
  { text: "Storybook", completed: false },
];

function App() {
  const [todos, setTodoValues] = React.useState(defaultTodos);
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
    setTodoValues(newTodos);
  };
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text) 
    const newTodos = [...todos]
    newTodos.splice(todoIndex, 1)
    setTodoValues(newTodos)
  }
  return (
    <React.Fragment>
      <TodoCounter completed={completedTodo} total={totalTodos} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      <TodoList>
        {searchTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text, true)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
