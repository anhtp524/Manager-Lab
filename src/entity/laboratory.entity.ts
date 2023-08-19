import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeacherEntity } from "./teacher.entity";

@Entity({name: "Laboratory"})
export class LaboratoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name:string;

    @Column()
    description: string;

    @OneToOne(() => TeacherEntity)
    @JoinColumn()
    idTeacher: TeacherEntity;
}