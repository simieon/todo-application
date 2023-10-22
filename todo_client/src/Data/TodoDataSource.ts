import { Todo } from "../Domain/Models/Todo";

export default interface TodoDataSource {
  getTodos(): Promise<Todo[]>
  getTodo(id: number): Promise<Todo>
  createTodo(value: string): Promise<Todo>
  toggleTodoCheck(id: number): Promise<boolean>
  removeTodo(id: number): Promise<boolean>
}