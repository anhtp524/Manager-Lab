import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "src/entity/message.entity";
import { MessageService } from "./message.service";
import { StudentEntity } from "src/entity/student.entity";
import { TeacherEntity } from "src/entity/teacher.entity";
import { MessageController } from "./message.controller";

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity, StudentEntity, TeacherEntity])
    ],
    providers: [MessageService],
    controllers: [MessageController],
    exports: [MessageService]
  })
  export class MessageModule {}