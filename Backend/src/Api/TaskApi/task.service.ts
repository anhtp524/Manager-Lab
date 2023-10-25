import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "src/entity/task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TaskService{
    constructor(
        @InjectRepository(TaskEntity)
        private taskRepo: Repository<TaskEntity>
    ){}

    async getListTaskInProject(projectId: string){
        const listTaskModel = await this.taskRepo.find({
            relations: {
                project: true
            },
            where: {
                project: {
                    id: projectId
                }
            }
        })

        return listTaskModel;
    }

    async createTask() {
        
    }
}