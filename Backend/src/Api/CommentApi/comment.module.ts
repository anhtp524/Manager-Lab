import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "src/entity/comment.entity";
import { CommentService } from "./comment.service";
import { CommentCotroller } from "./comment.controller";
import { DocumentModule } from "../DocumentApi/document.module";

@Module({
    imports: [TypeOrmModule.forFeature([CommentEntity]),
        DocumentModule
    ],
    providers: [CommentService],
    controllers: [CommentCotroller],
  })
  export class CommentModule {}