import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity({name: "Task"})
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    content: string;
    
    @Column()
    createDate: Date;
    
    @Column()
    dueDate: Date;
    
    @Column()
    response: string;
    
    @Column()
    isPass: boolean;

    @ManyToOne(() => ProjectEntity)
    @JoinColumn({referencedColumnName: "id"})
    project: ProjectEntity;
}