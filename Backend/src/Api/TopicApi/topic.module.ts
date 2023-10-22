import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TopicEntity } from "src/entity/topic.entity";
import { TopicService } from "./topic.service";
import { TopicController } from "./topic.controller";
import { DocumentModule } from "../DocumentApi/document.module";

@Module({
    imports: [TypeOrmModule.forFeature([TopicEntity]),
        DocumentModule
    ],
    providers: [TopicService],
    controllers: [TopicController],
  })
  export class TopicModule {}