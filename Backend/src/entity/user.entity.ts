import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "User"})
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;
}