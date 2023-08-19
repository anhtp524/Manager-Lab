import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    dateOfBirth: string;

    @ApiProperty()
    department: string;

    @ApiProperty()
    major: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    email: string;

}