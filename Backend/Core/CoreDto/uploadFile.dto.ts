import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDto {
    @ApiProperty()
    folderPath: string;

    @ApiProperty({type: 'string', format: 'binary'})
    file: string;
}