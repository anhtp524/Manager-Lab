import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsUUID } from "class-validator";

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

export class RegisterToLabDto {
    @ApiProperty()
    @IsUUID()
    studentId: string;

    @ApiProperty()
    @IsUUID()
    labId: string;
}