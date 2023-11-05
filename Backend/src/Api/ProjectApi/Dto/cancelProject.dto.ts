import { ApiProperty } from "@nestjs/swagger";

export class CancelProjectDto {
    @ApiProperty()
    projectId: string;
}