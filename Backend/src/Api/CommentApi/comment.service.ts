import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "src/entity/comment.entity";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./Dto/createComment.dto";
import { TopicEntity } from "src/entity/topic.entity";
import { UserEntity } from "src/entity/user.entity";
import { DocumentService } from "../DocumentApi/document.service";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepo: Repository<CommentEntity>,
        private documentService: DocumentService
    ){}

    async getAllCommentInTopic(topicId: string){
        var listCommentModel = await this.commentRepo.find({
            where: {
                topic : {
                    id: topicId
                }
            }
        });

        return listCommentModel;
    }

    async createComment(createCommentDto: CreateCommentDto, topicId: string, userId: string){
        var commentModel = await this.commentRepo.create({content: createCommentDto.content});
        commentModel.createdDate = new Date();
        commentModel.topic = new TopicEntity();
        commentModel.topic.id = topicId;
        commentModel.owner = new UserEntity();
        commentModel.owner.id = userId;
        //await this.documentService.UpdateRegardingId(createCommentDto.listFile, )
        var res = await this.commentRepo.save(commentModel);
        return res;
    }
}