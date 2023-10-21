import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LaboratoryEntity } from "./laboratory.entity";
import { UserEntity } from "./user.entity";

@Entity({name: "Topic"})
export class TopicEntity {
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column()
    content: string;

    @Column({type: "date"})
    createdDate: Date;

    @ManyToOne(() => LaboratoryEntity)
    @JoinColumn({referencedColumnName: "id"})
    lab: LaboratoryEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({referencedColumnName: "id"})
    owner: UserEntity;
}