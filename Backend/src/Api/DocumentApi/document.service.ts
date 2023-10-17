import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentEntity } from "src/entity/document.entity";
import { DocumentRuleEntity } from "src/entity/documentRule.entity";
import { Repository } from "typeorm";
import { CreateDocumentDto } from "./Dto/document.dto";
import { emptyUUID } from "Core/Constant/uuid.constant";
import { DocumentModelResponse } from "./Dto/documentView";

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(DocumentEntity)
        private documentRepo: Repository<DocumentEntity>,
        @InjectRepository(DocumentRuleEntity)
        private documentRuleRepo: Repository<DocumentRuleEntity>
    ){}

    async addDocument(creatdocumentDto : CreateDocumentDto, folderPath: string, userId: string) {
        var documentRuleDto = {
            folderPath: folderPath,
            regardingId: emptyUUID
        }
        const documentRuleModel = await this.documentRuleRepo.create(documentRuleDto);
        await this.documentRuleRepo.save(documentRuleModel);
        const documentModel = await this.documentRepo.create(creatdocumentDto);
        documentModel.documentRule = new DocumentRuleEntity();
        documentModel.documentRule.id = documentRuleModel.id;
        documentModel.createdBy = userId;
        await this.documentRepo.save(documentModel);
        const documentResponse: DocumentModelResponse = {
            id: documentModel.id,
            documentName: documentModel.documentName,
            documentType: documentModel.documentType,
            size: documentModel.size,
            mimeType: documentModel.mimeType,
            documentRuleId: documentModel.documentRule.id
        };
        return documentResponse;
    }

    async getDocumentById(fileId: string){
        var documentModel = await this.documentRepo.findOneBy({id : fileId})
        if(documentModel === null) return documentModel;
        var documentResponse: DocumentModelResponse = {
            id: documentModel.id,
            documentName: documentModel.documentName,
            documentType: documentModel.documentType,
            size: documentModel.size,
            mimeType: documentModel.mimeType,
        }

        return documentResponse;
    }

    async deleteDocument(id: string){
        var result = await this.documentRepo.delete(id);
        return result;
    }

    async UpdateRegardingId(listFile: string[], regardingId: string, folderPath: string, isCreated: boolean){

    }
}