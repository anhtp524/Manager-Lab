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

export class AprrovalStudentToProjectDto {
    @ApiProperty()
    projectId: string;

    @ApiProperty()
    studentId: string;
}

export class StudentAddDto {
    
}

export class ProjectAddDto {
    @ApiProperty()
    projectAdd: CreateProject;
    
    @ApiProperty()
    listStudent: string[];

    @ApiProperty()
    listTeacher: string[];

    @ApiProperty()
    listAttachment: string[];
}



