import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectEntity } from "src/entity/project.entity";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { StudentEntity } from "src/entity/student.entity";
import { TeacherProjectEntity } from "src/entity/teacherProject.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, StudentEntity, TeacherProjectEntity])],
    providers: [ProjectService],
    controllers: [ProjectController],
  })
  export class ProjectModule {}