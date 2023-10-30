import { TodoRepository } from "../../Repository/TodoRepository";
import { UseCase } from "../UseCase";

export class ToggleCheckTodo implements UseCase<number, boolean> {
  private todoRepo: TodoRepository

  constructor(_todoRepo: TodoRepository){
    this.todoRepo = _todoRepo
  }

  async invoke(id: number) {
    const created = this.todoRepo.markAsRead(id)
    return created
  }
}