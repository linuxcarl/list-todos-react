import React from 'react';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
// import './App.css';

const defaultTodos = [
  { text: 'Rappi Mèxico', completed: true },
  { text: 'Tomar el cursso de intro a React', completed: false },
  { text: 'Descansar', completed: false },
  { text: 'Storybook', completed: false },
];

function App() {
  const [todos, setTodoValues] = React.useState(defaultTodos)
  const [searchValue, setSearchValue] = React.useState('')

  const completedTodo = todos.filter(r => !!r.completed).length
  const totalTodos = todos.length

  let  searchTodos = []
  if(!searchValue>=1){
    searchTodos = todos
  }else{
    searchTodos = todos.filter( todo => {
      const todoText = todo.text.toLowerCase()
      const searchTodo = searchValue.toLowerCase()
      return todoText.includes(searchTodo)
    })
  }

  return (
    <React.Fragment>
      <TodoCounter 
        completed={completedTodo}
        total = {totalTodos}
      />
      <TodoSearch  
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
