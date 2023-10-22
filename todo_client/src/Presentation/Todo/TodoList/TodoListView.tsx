import { useEffect } from "react";
import {TodoListViewModel} from "./TodoListViewModel";

export const TodoListView = () => {
  const {
    getTodos,
    createTodo,
    onChangeValue,
    toggleRead,
    removeTodo,
    value,
    todos,
  } = TodoListViewModel()

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <div className='input-field'>
        <input 
          onChange={onChangeValue}
          value={value} 
          type="text" 
          id="title" 
          placeholder='Enter the task title'
          onKeyDown={(event) => {
            if(event.key === 'Enter'){
              createTodo()
            }
          }}
        />
        <label htmlFor="title" className='active'>Enter the task title</label>
      </div>

      <ul>
      {todos.map((todo) => {
        const classes = ['todo']
        if(todo.isCompleted){
          classes.push('completed')
        }

        return (
          <li className={classes.join(' ')} key={todo.id}>
            <label>
              <input 
                type="checkbox" 
                checked={todo.isCompleted}
                onChange={() => toggleRead(todo.id!)}
              />
              <span>{todo.title}</span>
              <i
                className="material-symbols-outlined red-text"
                onClick={(event) => {
                  event.preventDefault()
                  removeTodo(todo.id!)
                }}
              > 
              delete</i>
            </label>
          </li>
        )
      })}
      </ul>
    </>
  )
}