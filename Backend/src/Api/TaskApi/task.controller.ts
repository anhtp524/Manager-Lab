import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./Dto/createTask.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ResponseModel } from "./Dto/responseTask.dto";
import { CloseTaskDto } from "./Dto/closeTask.dto";

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

    @Post("responsetask")
    @ApiBody({type: ResponseModel})
    async ResponseTask(@Body() responseTask: ResponseModel) {
        const result = await this.taskService.responseTask(responseTask);
        return result;
    }

    @Post("closetask")
    @ApiBody({type: CloseTaskDto})
    async CloseTask(@Body() closeTask: CloseTaskDto) {
        const result = await this.taskService.CloseTask(closeTask);
        return result;
    }

    @Get("getdetailtask/:taskId")
    async GetDetailTask(@Param('taskId') taskId: string) {
        const result = await this.taskService.GetTaskById(taskId);
        return result;
    }

}