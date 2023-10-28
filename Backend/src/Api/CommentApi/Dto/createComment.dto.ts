import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty()
    taskId: string;
    @ApiProperty()
    content: string;
}