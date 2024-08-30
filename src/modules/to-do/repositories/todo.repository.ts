import { Injectable } from "@nestjs/common";
import { Between, DataSource, ILike, Repository } from "typeorm";
import { TodoEntity } from "../entities/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TodoRepository extends Repository<TodoEntity> {
    constructor(@InjectRepository(TodoEntity) repository: Repository<TodoEntity>){
        super(repository.target, repository.manager)
    }

    async getOneById(id: string): Promise<TodoEntity> {
        const entity = await this.findOneBy({
            id
        })

        if(!entity) 
            throw Error("Item com esse ID não existe")
        
        return entity
    }

    async list(params: {
        page: number,
        perPage: number,
        createdAt?: Date,
        dificult?: number,
        search?: string,
        completed?: boolean
    }): Promise<TodoEntity[]> {
        const where = {}
        if (params.createdAt){
            const startOfDay = new Date(params.createdAt)
            startOfDay.setHours(0)
            startOfDay.setMinutes(0)
            startOfDay.setSeconds(0)
            startOfDay.setMilliseconds(0)
            const endOfDay = new Date(params.createdAt)
            endOfDay.setHours(23)
            endOfDay.setMinutes(59)
            endOfDay.setSeconds(59)
            endOfDay.setMilliseconds(999)
            where['createdAt'] = Between(startOfDay, endOfDay)
        }
        if (params.completed){
            where['completed'] = params.completed
        }
        if (params.dificult){
            where['dificult'] = params.dificult
        }
        if (params.search){
            where['text'] = ILike(`%${params.search}%`)
        }
        if (params.search){
            where['text'] = params.search
        }
        
        const skip = (params.page - 1) * params.perPage

        const entities = await this.find({
            where,
            skip,
            order: {
                complete: "ASC", 
                createdAt: "DESC"
            }
        })

        return entities
    }

    async registerItem(input: Partial<TodoEntity>): Promise<TodoEntity> {
        const entity = this.create(input)
        await this.save(entity)

        return entity
    }
}
