import { Todo } from "../../Domain/Models/Todo";
import { TodoRepository } from "../../Domain/Repository/TodoRepository";
import TodoDataSource from "../TodoDataSource";

export class TodoRepositoryImpl implements TodoRepository {
  dataSource: TodoDataSource

  constructor(_dataSource: TodoDataSource) {
    this.dataSource = _dataSource
  }
  
  getTodos(): Promise<Todo[]> {
    return this.dataSource.getTodos()
  }

  createTodo(value: string): Promise<Todo> {
    return this.dataSource.createTodo(value)
  }
  
  markAsRead(id: number): Promise<boolean> {
    return this.dataSource.toggleTodoCheck(id)
  }
  
  removeTodo(id: number): Promise<boolean> {
    return this.dataSource.removeTodo(id)
  }

}