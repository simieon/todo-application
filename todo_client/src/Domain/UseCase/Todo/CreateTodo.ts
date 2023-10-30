import { Todo } from "../../Models/Todo";
import { TodoRepository } from "../../Repository/TodoRepository";
import { UseCase } from "../UseCase";

export class CreateTodo implements UseCase<string, Todo> {
  private todoRepo: TodoRepository

  constructor(_todoRepo: TodoRepository){
    this.todoRepo = _todoRepo;
  }

  async invoke(value: string) {
    if (value.length < 2) {
      throw new Error(
        "Your todo should have at leat 2 characters."
      );
    }
    const created = this.todoRepo.createTodo(value);
    return created;
  }
}