import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentEntity } from "src/entity/document.entity";
import { DocumentRuleEntity } from "src/entity/documentRule.entity";
import { DocumentController } from "./document.controller";
import { DocumentService } from "./document.service";

@Module({
    imports : [TypeOrmModule.forFeature([DocumentEntity, DocumentRuleEntity])],
    providers : [DocumentService],
    controllers : [DocumentController],
    exports : [DocumentService]
})
export class DocumentModule {}
