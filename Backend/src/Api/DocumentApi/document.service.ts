import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentEntity } from "src/entity/document.entity";
import { DocumentRuleEntity } from "src/entity/documentRule.entity";
import { Repository } from "typeorm";
import { CreateDocumentDto } from "./Dto/document.dto";
import { emptyUUID } from "Core/Constant/uuid.constant";

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(DocumentEntity)
        private documentRepo: Repository<DocumentEntity>,
        @InjectRepository(DocumentRuleEntity)
        private documentRuleRepo: Repository<DocumentRuleEntity>
    ){}

    async addDocument(creatdocumentDto : CreateDocumentDto, folderPath: string) {
        var documentRuleDto = {
            folderPath: folderPath,
            regardingId: emptyUUID
        }
        const documentRuleModel = await this.documentRuleRepo.create(documentRuleDto);
        await this.documentRuleRepo.save(documentRuleModel);
        const documentModel = await this.documentRepo.create(creatdocumentDto);
        documentModel.documentRule = new DocumentRuleEntity();
        documentModel.documentRule.id = documentRuleModel.id;
        console.log(documentModel)
        return 1;
    }
}