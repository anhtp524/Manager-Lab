import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { LaboratoryEntity } from "./laboratory.entity";
import { UserEntity } from "./user.entity";

@Entity({name: "Student"})
export class StudentEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    studentCode: number;

    @Column()
    name: string;

    @Column({})
    dateOfBirth: string;

    @Column()
    class: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;
    
    @ManyToOne(() => LaboratoryEntity)
    @JoinColumn({referencedColumnName : "id"})
    lab: LaboratoryEntity;

    @Column({nullable: true})
    isApproveToLab: boolean;

    @OneToOne(() => UserEntity)
    @JoinColumn({referencedColumnName: "id"})
    user: UserEntity;
}