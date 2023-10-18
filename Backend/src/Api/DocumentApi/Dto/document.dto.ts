import { ApiProperty } from "@nestjs/swagger";

export class CreateDocumentDto {
    documentName : string;
    documentType : string;
    documentContent : Buffer;
    size : number;
    mimeType : string;
}

export class ByRegardingDto {
    @ApiProperty()
    regarding: string;

    @ApiProperty()
    folderPath: string;
}