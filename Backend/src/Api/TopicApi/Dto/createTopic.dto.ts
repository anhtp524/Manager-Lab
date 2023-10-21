import { ApiProperty } from "@nestjs/swagger";

export class CreateTopicDto {
    @ApiProperty()
    content: string;
    @ApiProperty()
    listFile: string[];
}