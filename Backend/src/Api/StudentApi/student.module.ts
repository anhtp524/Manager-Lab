import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "src/entity/student.entity";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity])],
    providers: [StudentService],
    controllers: [StudentController],
    exports: [StudentService]
  })
  export class StudentModule {}