import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity({name: "Student"})
export class StudentEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    msv: number;

    @Column()
    name: string;

    @Column()
    dateOfBirth: string;

    @Column()
    class: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @ManyToOne(() => ProjectEntity)
    @JoinColumn()
    projectId: ProjectEntity;

    @Column()
    isApproveToLab: boolean;
}