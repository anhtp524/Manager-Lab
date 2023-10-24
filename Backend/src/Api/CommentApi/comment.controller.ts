import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CreateCommentDto } from "./Dto/createComment.dto";

@Controller()
@ApiTags("Comment")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class CommentCotroller {
    constructor(
        private commentService: CommentService
    ){}

    @Get("getallcomment/:topicId")
    async GetAllCommentInTopic(@Param("topicId") topicId: string) {
        const result = await this.commentService.getAllCommentInTopic(topicId);
        return result;
    }

    @Post("createcomment")
    @ApiBody({type: CreateCommentDto})
    async CreateComment(@Body() newComment: CreateCommentDto){
        //const result = await this.commentService.createComment()
        return 1;
    }
}