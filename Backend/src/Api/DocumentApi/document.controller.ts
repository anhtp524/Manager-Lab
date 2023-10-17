import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { DocumentService } from "./document.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateDocumentDto } from "./Dto/document.dto";
import { UploadFileDto } from "Core/CoreDto/uploadFile.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('document')
@ApiTags("Document")
@UseGuards(AuthGuard('jwt'))
export class DocumentController {
    constructor(
        private readonly documentService: DocumentService
    ){}

    @Post("adddocument")
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: UploadFileDto
      })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFileDb(@Body() uploadFileDto: UploadFileDto,
             @UploadedFile() file: Express.Multer.File,
             @Req() req) {
        var createDocumentDto: CreateDocumentDto = {
            documentName: file.originalname,
            documentType: file.originalname.split(".").at(-1),
            documentContent: file.buffer,
            size: file.size,
            mimeType: file.mimetype
        }
        const result = await this.documentService.addDocument(createDocumentDto, uploadFileDto.folderPath, req.user.userId);
        return result;
    }
}