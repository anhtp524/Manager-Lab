import { Role } from 'Core/Enum/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "User"})
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({type: "enum", enum: Role, nullable: true})
  role: Role;
}