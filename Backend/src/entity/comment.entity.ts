import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { TaskEntity } from "./task.entity";

@Entity({name: "Comment"})
export class CommentEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    content: string;
    
    @Column({type: "date"})
    createdDate: Date;
    
    @ManyToOne(() => TaskEntity)
    @JoinColumn()
    task: TaskEntity;
    
    @ManyToOne(() => UserEntity)
    @JoinColumn({referencedColumnName: "id"})
    owner: UserEntity;
}