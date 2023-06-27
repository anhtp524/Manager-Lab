import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./teacher.entity";

@Entity()
export class Laboratory {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name:string;

    @Column()
    description: string;

    @OneToOne(() => Teacher)
    @JoinColumn()
    idTeacher: Teacher;
}