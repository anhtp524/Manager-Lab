import { ApiProperty } from "@nestjs/swagger";
import { Role } from "Core/Enum/role.enum";
import { Type } from "class-transformer";
import { CreateStudentDto } from "src/Api/StudentApi/Dto/student.dto";
import { CreateTeacherDto } from "src/Api/TeacherApi/Dto/teacher.dto";

export class CreateUserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty({type : "enum", enum: Role})
    role: Role;

    @ApiProperty()
    studentAdd: CreateStudentDto;

    @ApiProperty()
    teacherAdd: CreateTeacherDto;

}