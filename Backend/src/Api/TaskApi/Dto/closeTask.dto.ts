import { ApiProperty } from "@nestjs/swagger";

export class CloseTaskDto {
    
    @ApiProperty()
    taskId: string;
    
    @ApiProperty()
    comment: string;
}