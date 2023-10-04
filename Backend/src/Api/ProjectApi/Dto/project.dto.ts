import { ApiProperty } from "@nestjs/swagger";

export class CreateProject{
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    coreTech: string;
}

export class RegisterStudentToProjectDto {
    @ApiProperty()
    projectId: string;

    @ApiProperty()
    studentId: string;
}