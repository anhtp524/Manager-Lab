import { ApiProperty } from "@nestjs/swagger";

export class EditTaskDto {
    @ApiProperty()
    taskId: string;

    @ApiProperty()
    title: string;
    
    @ApiProperty()
    content: string;
    
    @ApiProperty()
    dueDate: Date;
    
    @ApiProperty()
    listFileId: string[];
}