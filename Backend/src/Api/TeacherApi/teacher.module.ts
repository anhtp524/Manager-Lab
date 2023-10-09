import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherEntity } from "src/entity/teacher.entity";
import { TeacherService } from "./teacher.service";
import { TeacherController } from "./teacher.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TeacherEntity])],
    providers: [TeacherService],
    controllers: [TeacherController],
    exports: [TeacherService]
  })
  export class TeacherModule {}