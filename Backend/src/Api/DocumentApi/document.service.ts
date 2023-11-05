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
        var documentModel = await this.documentRepo.findOne({
            relations : {
                documentRule: true
            },
            where: {
                id : fileId
            },

        })
        //if(documentModel === null) return documentModel;
        //documentModel.documentContent = null;
        return documentModel;
    }

    async getDocumentRuleByRegardingId(regardingId: string, folderPath: string) {
        var documentRuleModel = await this.documentRuleRepo.findOne({
            where : {
                regardingId: regardingId,
                folderPath: folderPath
            }
        })
        return documentRuleModel;
    }

    async getDocumentByRegarding(regardingId: string, folderPath: string){
        var documentRuleModel = await this.getDocumentRuleByRegardingId(regardingId, folderPath);
        const listdocument = await this.documentRepo.find({
            where : {
                documentRule: {
                    id : documentRuleModel.id
                }
            }
        });
        var documents = listdocument.map(document => {
            document.documentContent = null;
            return document;
        } );
        return documents;
    }

    async deleteDocument(id: string){
        var result = await this.documentRepo.delete(id);
        return result;
    }

    async UpdateRegardingId(listFile: string[], regardingId: string, folderPath: string, isCreated: boolean){
        var keepFile = "";
        if(!isCreated)
        {
            var documentRule = await this.getDocumentRuleByRegardingId(regardingId,folderPath);
            if(documentRule !== null) {
                var documentItems = await this.documentRepo.find({
                    where : {
                        documentRule : {
                            id : documentRule.id
                        }
                    }
                });
                keepFile = documentRule.id;
                if (documentItems.length > 0) {
                    for(let item of documentItems) {
                        
                        if (listFile.includes(item.id)) {
                            listFile = listFile.filter(x => x !== item.id);
                        }
                        else {
                            await this.documentRepo.delete(item.id)
                        }
                    }
                }
            }
        }

        if(listFile.length > 0) 
        {
            var firstFileId = listFile[0];
            var firstDocument = await this.getDocumentById(firstFileId);
            var firstDocumentRule = await this.documentRuleRepo.findOneBy({id: firstDocument.documentRule.id})
            for(let file of listFile) {
                var documentItem = await this.getDocumentById(file);
                var currentDocumentRuleId = documentItem.documentRule.id;
                documentItem.documentRule.id = keepFile !== "" ? keepFile : firstDocumentRule.id;
                await this.documentRepo.save(documentItem);
            }

            if(isCreated || keepFile === "")
            {
                firstDocumentRule.folderPath = folderPath;
                firstDocumentRule.regardingId = regardingId;
    
                await this.documentRuleRepo.save(firstDocumentRule);
            }
        }
    }
}