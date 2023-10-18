import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectEntity } from "src/entity/project.entity";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { StudentEntity } from "src/entity/student.entity";
import { TeacherProjectEntity } from "src/entity/teacherProject.entity";
import { TeacherEntity } from "src/entity/teacher.entity";
import { DocumentModule } from "../DocumentApi/document.module";

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, StudentEntity, TeacherProjectEntity, TeacherEntity]),
    DocumentModule
  ],
    providers: [ProjectService],
    controllers: [ProjectController],
  })
  export class ProjectModule {}