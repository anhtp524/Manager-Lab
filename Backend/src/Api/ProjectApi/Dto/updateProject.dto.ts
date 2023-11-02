import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectDto {
    
    @ApiProperty()
    projectId: string;
    
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    description: string;
    
    @ApiProperty()
    coreTech: string;
    
    @ApiProperty()
    listFile: string;
}