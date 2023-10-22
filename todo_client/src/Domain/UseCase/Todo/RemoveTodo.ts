import { TodoRepository } from "../../Repository/TodoRepository";

export interface RemoveTodosUseCase {
  invoke: (id: number) => Promise<boolean>
}

export class RemoveTodo implements RemoveTodosUseCase {
  private todoRepo: TodoRepository

  constructor(_todoRepo: TodoRepository) {
    this.todoRepo = _todoRepo
  }

  async invoke(id: number) {
    return this.todoRepo.removeTodo(id)
  }
}