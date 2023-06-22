import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Student {
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

    @ManyToOne(() => Project)
    @JoinColumn()
    projectId: Project;
}