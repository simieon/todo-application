import { TodoRepository } from "../../Repository/TodoRepository";
import { UseCase } from "../UseCase";

export class RemoveTodo implements UseCase<number, boolean> {
  private todoRepo: TodoRepository

  constructor(_todoRepo: TodoRepository) {
    this.todoRepo = _todoRepo
  }

  async invoke(id: number) {
    return this.todoRepo.removeTodo(id)
  }
}