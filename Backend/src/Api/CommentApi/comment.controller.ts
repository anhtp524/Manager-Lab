import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateCommentDto } from "./Dto/createComment.dto";
import { tasks } from "googleapis/build/src/apis/tasks";

@Controller()
@ApiTags("Comment")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class CommentCotroller {
    constructor(
        private commentService: CommentService
    ){}

    @Get("getallcomment/:taskId")
    async GetAllCommentInTopic(@Param("taskId") taskId: string) {
        const result = await this.commentService.getAllCommentInTask(taskId);
        return result;
    }

    @Post("createcomment")
    @ApiBody({type: CreateCommentDto})
    async CreateComment(@Body() newComment: CreateCommentDto){
        //const result = await this.commentService.createComment()
        return 1;
    }
}