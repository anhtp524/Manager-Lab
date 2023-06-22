import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./teacher.entity";

@Entity()
export class Laboratory {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    name:string;

    description: string;

    @OneToOne(() => Teacher)
    @JoinColumn()
    idTeacher: Teacher;
}