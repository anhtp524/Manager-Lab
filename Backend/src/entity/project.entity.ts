import { ProjectStatus } from "Core/Enum/ProjectEnum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LaboratoryEntity } from "./laboratory.entity";

@Entity({name: "Project"})
export class ProjectEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    coreTech: string;

    @Column()
    description: string;

    @Column({type : "enum", enum : ProjectStatus, default : ProjectStatus.UnConfirm })
    status: ProjectStatus;

    @ManyToOne(() => LaboratoryEntity, {eager : true})
    @JoinColumn({referencedColumnName : 'id'})
    lab: LaboratoryEntity;

    @Column({nullable: true})
    feedback: string;

    @Column({nullable: true})
    score: number;

    @Column({nullable: true, type: "date"})
    finishDate: Date
}


