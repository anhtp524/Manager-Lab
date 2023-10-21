import { Controller } from "@nestjs/common";
import { CommentService } from "./comment.service";

@Controller()
export class CommentCotroller {
    constructor(
        private commentService: CommentService
    ){}
}