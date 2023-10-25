import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";

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
    
    @Column({default : false})
    isPass: boolean;

    @ManyToOne(() => ProjectEntity)
    @JoinColumn({referencedColumnName: "id"})
    project: ProjectEntity;
}