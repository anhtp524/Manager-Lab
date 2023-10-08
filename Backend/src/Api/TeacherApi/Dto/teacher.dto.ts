import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateTeacherDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    //@Type(() => Date)
    dateOfBirth: string;

    @ApiProperty()
    department: string;

    @ApiProperty()
    major: string;

    @ApiProperty()
    phoneNumber: string;
}