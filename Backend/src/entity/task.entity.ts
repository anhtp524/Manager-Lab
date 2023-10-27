import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { TaskStatus } from "Core/Enum/TaskEnum";

@Entity({name: "Task"})
export class TaskEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    content: string;
    
    @Column()
    createDate: Date;
    
    @Column()
    dueDate: Date;
    
    @Column({nullable: true})
    response: string;

    @Column()
    comment: string;
    
    @Column({type: "enum", enum: TaskStatus})
    status: TaskStatus;

    @ManyToOne(() => ProjectEntity)
    @JoinColumn({referencedColumnName: "id"})
    project: ProjectEntity;
}