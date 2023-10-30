import { ApiProperty } from "@nestjs/swagger";

export class TeacherProjectDto {
    @ApiProperty()
    projectId: string;

    @ApiProperty()
    teacherId: string;
}