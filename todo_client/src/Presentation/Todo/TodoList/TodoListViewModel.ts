import React, { useState } from "react";
import TodoApiDataSourceImpl from "../../../Data/DataSource/TodoApiDataSource";
import { TodoRepositoryImpl } from "../../../Data/Repository/TodoRepositoryImpl";
import { Todo } from "../../../Domain/Models/Todo";
import { GetTodos } from "../../../Domain/UseCase/Todo/GetTodos";
import { CreateTodo } from "../../../Domain/UseCase/Todo/CreateTodo";
import { ToggleCheckTodo } from "../../../Domain/UseCase/Todo/ToggleCheckTodo";
import { RemoveTodo } from "../../../Domain/UseCase/Todo/RemoveTodo";
import { toast } from "react-toastify";

export const TodoListViewModel = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [value, setValue] = useState<string>('')

  const todosDataSourceImpl = new TodoApiDataSourceImpl()
  const todosRepositoryImpl = new TodoRepositoryImpl(todosDataSourceImpl)

  const getTodosUseCase = new GetTodos(todosRepositoryImpl)
  const createTodosUseCase = new CreateTodo(todosRepositoryImpl)
  const toggleCheckTodoUseCase = new ToggleCheckTodo(todosRepositoryImpl)
  const removeTodosUseCase = new RemoveTodo(todosRepositoryImpl)

  const _resetValue = () => {
    setValue('')
  }

  const getTodos = async() => {
    setTodos(await getTodosUseCase.invoke())
  }

  const createTodo = async() => {
    try {
      const createdTodo = await createTodosUseCase.invoke(value)
      setTodos((prev) => [...prev, createdTodo])
      _resetValue()
    } catch (error) {
      _resetValue()
      if(error instanceof Error){
        toast(error.message)
      }
    }
  }

  const toggleRead = async(id: number) => {
    const createdTodo = await toggleCheckTodoUseCase.invoke(id)
    setTodos((prev) => [
      ...prev.map((i) => {
        const isToggled = i.id === id

        return {
          ...i,
          isCompleted: isToggled ? createdTodo : i.isCompleted
        }
      })
    ])
  }

  const removeTodo = async(id:number) => {
    const isRemoved = await removeTodosUseCase.invoke(id)

    if(isRemoved){
      setTodos((prev) => {
        return [...prev.filter((i) => i.id !== id)]
      })
    }
  }

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  return {
    getTodos,
    onChangeValue,
    removeTodo,
    createTodo,
    toggleRead,
    todos,
    value
  }
}