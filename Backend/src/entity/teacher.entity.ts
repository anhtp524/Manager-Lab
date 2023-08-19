import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { LaboratoryEntity } from "./laboratory.entity";

@Entity({name: "Teacher"})
export class TeacherEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    dateOfBirth: string;

    @Column()
    department: string;

    @Column()
    major: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @ManyToOne(() => ProjectEntity)
    @JoinColumn()
    projectId: ProjectEntity

    @ManyToOne(() => LaboratoryEntity)
    @JoinColumn()
    labId: LaboratoryEntity;
}