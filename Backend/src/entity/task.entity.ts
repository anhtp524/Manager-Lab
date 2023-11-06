import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';
import { TaskStatus } from 'Core/Enum/TaskEnum';
import { CommentEntity } from './comment.entity';

@Entity({ name: 'Task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({type: 'date'})
  createDate: Date;

  @Column({type: 'date'})
  dueDate: Date;

  @Column({ nullable: true })
  response: string;

  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;

  @Column({ nullable: true })
  feedback: string;

  @ManyToOne(() => ProjectEntity)
  @JoinColumn({ referencedColumnName: 'id' })
  project: ProjectEntity;
}
