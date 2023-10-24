import { JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { StudentEntity } from "./student.entity";

export class Project_StudentEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => ProjectEntity)
    @JoinColumn({referencedColumnName: "id"})
    project: ProjectEntity;

    @ManyToOne(() => StudentEntity)
    @JoinColumn({referencedColumnName: "id"})
    student: StudentEntity;
}