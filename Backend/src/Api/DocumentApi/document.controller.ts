import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DocumentService } from "./document.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ByRegardingDto, CreateDocumentDto } from "./Dto/document.dto";
import { UploadFileDto } from "Core/CoreDto/uploadFile.dto";
import { AuthGuard } from "@nestjs/passport";
import type { Response } from 'express';
import { Readable } from 'stream';

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

    @ApiBearerAuth()
    @Get("getdocumentbyid/:id") 
    async GetDocumentById(@Param('id') id: string){
        var res = await this.documentService.getDocumentById(id);
        return res;
    }

    @ApiBody({type: ByRegardingDto})
    @ApiBearerAuth()
    @Post("byregarding")
    async GetDocumentByRegarding(@Body() byRegardingDto: ByRegardingDto){
        var res = await this.documentService.getDocumentByRegarding(byRegardingDto.regarding, byRegardingDto.folderPath);
        return res;
    }

    @Get("download/:id")
    @ApiBearerAuth()
    @ApiResponse({
        schema: {
          type: 'string',
          format: 'binary',
        },
        status: HttpStatus.OK,
      })
    async getFile(@Param("id") id: string, @Res({ passthrough: true }) res: Response) {
    const file = await this.documentService.getDocumentById(id);
    const contentFile =  Readable.from(file.documentContent);
    res.set({
      'Content-Type': `${file.mimeType}`,
      'Content-Disposition': `attachment; filename=${file.documentName}`,
    });
    return new StreamableFile(contentFile);
  }
}