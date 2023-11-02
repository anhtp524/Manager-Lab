import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './Dto/createTask.dto';
import { ResponseModel } from './Dto/responseTask.dto';
import { TaskStatus } from 'Core/Enum/TaskEnum';
import { CloseTaskDto } from './Dto/closeTask.dto';
import { ProjectEntity } from 'src/entity/project.entity';
import { EditTaskDto } from './Dto/editTask.dto';
import { DocumentService } from '../DocumentApi/document.service';
import { FolderPath } from 'Core/Constant/folderPath.constant';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepo: Repository<TaskEntity>,
    private documentService: DocumentService
  ) {}

  async getListTaskInProject(projectId: string) {
    const listTaskModel = await this.taskRepo.find({
      where: {
        project: {
          id: projectId,
        },
      },
    });

    return listTaskModel;
  }

  async GetTaskById(taskId: string) {
    const taskModel = await this.taskRepo.findOne({
      where: {
        id: taskId,
      },
    });
    return taskModel;
  }

  async createTask(newTask: CreateTaskDto) {
    var taskModel = await this.taskRepo.create(newTask);
    taskModel.status = TaskStatus.New;
    taskModel.createDate = new Date();
    taskModel.project = new ProjectEntity();
    taskModel.project.id = newTask.projectId;
    await this.taskRepo.save(taskModel);
    return taskModel;
  }

  async responseTask(responseDto: ResponseModel) {
    var taskModel = await this.GetTaskById(responseDto.taskId);
    taskModel.response = responseDto.response;
    taskModel.status = TaskStatus.Resolve;
    await this.taskRepo.save(taskModel);
    return taskModel;
  }

  async CloseTask(closeDto: CloseTaskDto) {
    var taskModel = await this.GetTaskById(closeDto.taskId);
    if (!closeDto.isPass) {
      taskModel.status = TaskStatus.New;
    } else {
      taskModel.status = TaskStatus.Pass;
      taskModel.feedback = closeDto.feedback;
    }
    await this.taskRepo.save(taskModel);
    return taskModel;
  }

  async EditTask(updateTask: EditTaskDto) {
    const taskModel = await this.taskRepo.findOne({
      where: {
        id: updateTask.taskId
      }
    });
    if(taskModel.status === TaskStatus.New) {
      taskModel.content = updateTask.content;
      taskModel.title = updateTask.title;
      taskModel.dueDate = updateTask.dueDate;
      await this.taskRepo.save(taskModel);
      this.documentService.UpdateRegardingId(updateTask.listFileId, updateTask.taskId, FolderPath.createdTask, false);
    }

    return taskModel;
  }
}
