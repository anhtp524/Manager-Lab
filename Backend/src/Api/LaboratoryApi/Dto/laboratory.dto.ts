import { ApiProperty } from "@nestjs/swagger";

export class CreateLaboratoryDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
}

export class UpdateLaboratoryDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
}