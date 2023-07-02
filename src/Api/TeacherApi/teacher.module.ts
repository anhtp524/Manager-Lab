import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "src/entity/teacher.entity";
import { TeacherService } from "./teacher.service";
import { TeacherController } from "./teacher.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Teacher])],
    providers: [TeacherService],
    controllers: [TeacherController],
  })
  export class TeacherModule {}