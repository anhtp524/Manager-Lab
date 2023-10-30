import { ApiProperty } from "@nestjs/swagger";

export class CancelProject {
    @ApiProperty()
    projectId: string;
}