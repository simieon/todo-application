import { Todo } from "../../Domain/Models/Todo";
import TodoDataSource from "../TodoDataSource";
import { TodoApiEntity } from "./API/TodoApiEntity";
import localDb from "./LocalDB"
import { keys } from "../../keys/keys";

export default class TodoApiDataSourceImpl implements TodoDataSource {
  db = localDb<TodoApiEntity>(keys.proxy)

  async getTodos(): Promise<Todo[]> {
    const data = (await this.db).getAll()

    return (await data).map(item => ({
      id: item.id,
      title: item.title,
      isCompleted: item.completed
    }))
  }

  async getTodo(id: number): Promise<Todo> {
    throw new Error("Method not implemented.");
  }

  async createTodo(value: string): Promise<Todo> {
    const res: Todo = {
      title: value,
      isCompleted: false
    };

    const created = (await this.db).create({
      title: res.title,
      completed: res.isCompleted
    })

    return created
  }

  async toggleTodoCheck(id: number): Promise<boolean> {
    const item = (await this.db).updateByField(id)
    
    return (await item).completed
  }

  async removeTodo(id: number): Promise<boolean> {
    return (await this.db).removeById(id)
  }
}