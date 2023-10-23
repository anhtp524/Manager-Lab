import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Message")
export class MessageEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    message: string;
}