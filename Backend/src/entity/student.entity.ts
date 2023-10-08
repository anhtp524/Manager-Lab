import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { LaboratoryEntity } from "./laboratory.entity";

@Entity({name: "Student"})
export class StudentEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    msv: number;

    @Column()
    name: string;

    @Column({})
    dateOfBirth: string;

    @Column()
    class: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @ManyToOne(() => ProjectEntity, {eager : true})
    @JoinColumn({referencedColumnName : "id"})
    project: ProjectEntity;
    
    @ManyToOne(() => LaboratoryEntity)
    @JoinColumn({referencedColumnName : "id"})
    lab: LaboratoryEntity;

    @Column({nullable: true})
    isApproveToLab: boolean;

    @Column({nullable: true})
    isApproveToProject: boolean;
}