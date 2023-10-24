import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { LaboratoryEntity } from "./laboratory.entity";
import { UserEntity } from "./user.entity";

@Entity({name: "Teacher"})
export class TeacherEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({})
    dateOfBirth: string;

    @Column()
    department: string;

    @Column()
    major: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @ManyToOne(() => LaboratoryEntity, {eager : true})
    @JoinColumn()
    lab: LaboratoryEntity;

    @OneToOne(() => UserEntity)
    @JoinColumn({referencedColumnName: "id"})
    user: UserEntity;
}