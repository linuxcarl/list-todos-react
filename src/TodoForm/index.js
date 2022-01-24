import React from 'react';
import { TodoContext } from '../TodoContext';

function TodoForm(props) {
    const [newTodoValue, setNewTodoValue] =  React.useState('')
    const {
        addTodo,
        setOpenModal
    } = React.useContext(TodoContext)
    const onSubmit = (event) =>{
        event.preventDefault()
        addTodo(newTodoValue)
        setOpenModal(false)
    }
    const onChange = (event) =>{
        setNewTodoValue(event.target.value)
    }
    const onCancel = () =>{
        setOpenModal(false)
    }
  return (
      <form onSubmit={onSubmit}>
          <label>,,,</label>
          <textarea 
            value={newTodoValue} 
            onChange={onChange}
            placeholder='Texto para el nuevo todo'></textarea>
          <div>
          <button type ="button" onClick={onCancel}>Cancelar</button>
          <button tyoe="submit" onClick={addTodo}>Guardar</button>
          </div>
      </form>
  )
}

export { TodoForm };
