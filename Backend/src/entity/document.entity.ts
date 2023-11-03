import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentRuleEntity } from './documentRule.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'Document' })
export class DocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  documentName: string;

  @Column()
  documentType: string;

  @Column({ type: 'bytea' })
  documentContent: Uint8Array;

  @Column()
  size: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ referencedColumnName: 'id' })
  createdBy: string;

  @Column()
  mimeType: string;

  @ManyToOne(() => DocumentRuleEntity)
  @JoinColumn({ referencedColumnName: 'id' })
  documentRule: DocumentRuleEntity;
}
