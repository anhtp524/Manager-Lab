import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "src/entity/task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./Dto/createTask.dto";

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

    async createTask(newTask: CreateTaskDto) {
        var taskModel = await this.taskRepo.create(newTask);
        console.log(taskModel);
        await this.taskRepo.save(taskModel);
        return taskModel;
    }
}