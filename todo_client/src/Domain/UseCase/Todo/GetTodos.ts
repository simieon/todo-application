import { Todo } from "../../Models/Todo";
import { TodoRepository } from "../../Repository/TodoRepository";
import { UseCase } from "../UseCase";

export class GetTodos implements UseCase<null, Todo[]> {
  private todoRepo: TodoRepository

  constructor(_todoRepo: TodoRepository){
    this.todoRepo = _todoRepo
  }

  async invoke(){
    return this.todoRepo.getTodos()
  }
}