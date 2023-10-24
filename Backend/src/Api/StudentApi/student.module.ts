import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentEntity } from "src/entity/student.entity";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { UsersModule } from "../UserApi/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity]),
      UsersModule
    ],
    providers: [StudentService],
    controllers: [StudentController],
    exports: [StudentService]
  })
  export class StudentModule {}