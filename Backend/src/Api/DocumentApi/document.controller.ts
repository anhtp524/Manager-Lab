import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { DocumentService } from "./document.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateDocumentDto } from "./Dto/document.dto";
import { UploadFileDto } from "Core/CoreDto/uploadFile.dto";

@Controller('document')
@ApiTags("Document")
export class DocumentController {
    constructor(
        private readonly documentService: DocumentService
    ){}

    @Post("adddocument")
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: UploadFileDto
      })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFileDb(@Body() uploadFileDto: UploadFileDto, @UploadedFile() file: Express.Multer.File) {
        var createDocumentDto: CreateDocumentDto = {
            documentName: file.originalname,
            documentType: file.originalname.split(".").at(-1),
            documentContent: file.buffer,
            size: file.size,
            mimeType: file.mimetype
        }
        const result = await this.documentService.addDocument(createDocumentDto, uploadFileDto.folderPath);
        return 1;
    }
}