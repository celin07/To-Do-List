import { Injectable } from "@nestjs/common";
import { TodoRepository } from "./repositories/todo.repository";
import { TodoEntity } from "./entities/todo.entity";

@Injectable()
export class TodoService {
    constructor(private readonly TodoRepository: TodoRepository) {}
        
    async createNewTodoItem(text: string, dificult: number):Promise<TodoEntity>{
        const data = {
            text
        }
        if (dificult <= 0) data["dificult"] = 0
        else if (dificult <= 25) data["dificult"] = 25
        else if (dificult <= 50) data["dificult"] = 50
        else if (dificult <= 75) data["dificult"] = 75
        else data["dificult"] = 100

        const entity = await this.TodoRepository.registerItem(data);

        return entity
    }
}