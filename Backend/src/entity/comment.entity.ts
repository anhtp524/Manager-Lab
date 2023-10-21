import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TopicEntity } from "./topic.entity";
import { UserEntity } from "./user.entity";

@Entity({name: "Comment"})
export class CommentEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    content: string;
    
    @Column({type: "date"})
    createdDate: Date;
    
    @ManyToOne(() => TopicEntity)
    @JoinColumn()
    topic: TopicEntity;
    
    @ManyToOne(() => UserEntity)
    @JoinColumn({referencedColumnName: "id"})
    owner: UserEntity;
}