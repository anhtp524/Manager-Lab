import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "BoxChat"})
export class BoxChatEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    name: string;
}