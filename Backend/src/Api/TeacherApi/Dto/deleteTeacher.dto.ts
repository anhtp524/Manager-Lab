import { ApiProperty } from "@nestjs/swagger";

export class DeleteTeacherDto {
    @ApiProperty()
    teacherId: string
}