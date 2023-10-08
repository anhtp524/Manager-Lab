import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateStudentDto {
    @ApiProperty()
    msv: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    //@Type(() => Date)
    dateOfBirth: string;

    @ApiProperty()
    class: string;

    @ApiProperty()
    phoneNumber: string;
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