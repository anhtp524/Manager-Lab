import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "src/entity/comment.entity";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./Dto/createComment.dto";
import { UserEntity } from "src/entity/user.entity";
import { DocumentService } from "../DocumentApi/document.service";
import { TaskEntity } from "src/entity/task.entity";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepo: Repository<CommentEntity>,
        private documentService: DocumentService
    ){}

    async getAllCommentInTask(taskId: string){
        var listCommentModel = await this.commentRepo.find({
            where: {
                task : {
                    id: taskId
                }
            }
        });

        return listCommentModel;
    }

    async createComment(createCommentDto: CreateCommentDto, userId: string){
        var commentModel = await this.commentRepo.create({content: createCommentDto.content});
        commentModel.createdDate = new Date();
        commentModel.task = new TaskEntity();
        commentModel.task.id = createCommentDto.taskId;
        commentModel.owner = new UserEntity();
        commentModel.owner.id = userId;
        var res = await this.commentRepo.save(commentModel);
        return res;
    }
}