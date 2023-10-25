import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    content: string;
    
    @ApiProperty()
    createDate: Date;
    
    @ApiProperty()
    dueDate: Date;
    
    @ApiProperty()
    projectId: string;
}