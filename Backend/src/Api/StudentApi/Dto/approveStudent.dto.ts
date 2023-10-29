import { ApiProperty } from "@nestjs/swagger";

export class ApproveStudentDto {
    @ApiProperty()
    studentId: string;
}