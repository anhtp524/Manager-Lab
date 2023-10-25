import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./Dto/createTask.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags("Task")
@Controller()
export class TaskController{
    constructor(
        private taskService: TaskService
    ){}

    @Get("getlisttask/:projectId")
    async GetListTask(@Param("projectId") projectId: string) {
        const result = await this.taskService.getListTaskInProject(projectId);
        return result;
    }

    @Post("createtask")
    @ApiBody({type: CreateTaskDto})
    async CreateTask(@Body() newTask: CreateTaskDto){
        const result = await this.taskService.createTask(newTask);
        return result;
    }
}