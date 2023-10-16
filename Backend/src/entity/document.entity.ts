import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentRuleEntity } from "./documentRule.entity";

@Entity({name :"Document"})
export class DocumentEntity {
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column()
    documentName : string;

    @Column()
    documentType : string;
    
    @Column({type : 'bytea'})
    documentContent : Uint8Array;   
    
    @Column()
    size : number;
    
    @Column({type: 'uuid'})
    createdBy : string;

    @Column()
    mimeType : string;
    
    @ManyToOne(() => DocumentRuleEntity)
    @JoinColumn({referencedColumnName : "id"})
    documentRule : DocumentRuleEntity;
}