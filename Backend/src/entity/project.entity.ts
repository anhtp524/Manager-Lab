import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Project"})
export class ProjectEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    coreTech: string;

    @Column()
    description: string;
}