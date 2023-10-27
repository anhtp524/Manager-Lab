import { ApiProperty } from "@nestjs/swagger";

export class ResponseModel {
    
    @ApiProperty()
    taskId: string;
    
    @ApiProperty()
    response: string;
    
    @ApiProperty()
    listAttachment: string[];
}
