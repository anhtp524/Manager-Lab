import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {
    @ApiProperty()
    msv: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    dateOfBirth: string;

    @ApiProperty()
    class: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    email: string;
}

export class UpdateStudentDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    dateOfBirth: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    email: string;

}