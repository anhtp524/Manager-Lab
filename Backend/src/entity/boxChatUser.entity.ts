import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoxChatEntity } from "./boxChat.entity";
import { UserEntity } from "./user.entity";

@Entity({name: "BoxChat_User"})
export class BoxChat_UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => BoxChatEntity)
    @JoinColumn({referencedColumnName: "id"})
    boxChat: BoxChatEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({referencedColumnName: "id"})
    user: UserEntity;
}