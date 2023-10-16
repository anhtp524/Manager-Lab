import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "DocumentRule"})
export class DocumentRuleEntity {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    folderPath : string;

    @Column({type : 'uuid'})
    regardingId : string;
}