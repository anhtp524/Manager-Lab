import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { TaskStatus } from "Core/Enum/TaskEnum";
import { CommentEntity } from "./comment.entity";

@Entity({name: "Task"})
export class TaskEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;
    
    @Column()
    content: string;
    
    @Column()
    createDate: Date;
    
    @Column()
    dueDate: Date;
    
    @Column({nullable: true})
    response: string;
    
    @Column({type: "enum", enum: TaskStatus})
    status: TaskStatus;

    @Column()
    feedback: string;
    
    @ManyToOne(() => ProjectEntity)
    @JoinColumn({referencedColumnName: "id"})
    project: ProjectEntity;
}