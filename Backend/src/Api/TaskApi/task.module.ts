import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "src/entity/task.entity";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { DocumentModule } from "../DocumentApi/document.module";

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity]),
        DocumentModule
    ],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule{}