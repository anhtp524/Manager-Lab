import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeacherEntity } from "./teacher.entity";
import { ProjectEntity } from "./project.entity";

@Entity()
export class TeacherProjectEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => TeacherEntity, {eager : false})
    @JoinColumn({referencedColumnName : "id"})
    teacher: string;

    @ManyToOne(() => ProjectEntity, {eager : false})
    @JoinColumn({referencedColumnName : "id"})
    project: string;
}