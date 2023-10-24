import { ApiProperty } from "@nestjs/swagger";

export class CreateBoxChatDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    userId: string[];
}