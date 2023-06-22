import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    dateOfBirth: string;

    @Column()
    departmaent: string;

    @Column()
    major: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @ManyToOne(() => Project)
    @JoinColumn()
    projectId: Project
}