import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "src/entity/message.entity";
import { MessageService } from "./message.service";

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity])
    ],
    providers: [MessageService],
    controllers: [],
    exports: [MessageService]
  })
  export class MessageModule {}