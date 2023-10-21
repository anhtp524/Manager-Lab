import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TopicEntity } from "src/entity/topic.entity";
import { TopicService } from "./topic.service";
import { TopicController } from "./topic.controller";
import { DocumentService } from "../DocumentApi/document.service";

@Module({
    imports: [TypeOrmModule.forFeature([TopicEntity]),
        DocumentService
    ],
    providers: [TopicService],
    controllers: [TopicController],
  })
  export class TopicModule {}