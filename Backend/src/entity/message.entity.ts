import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoxChatEntity } from './boxChat.entity';
import { UserEntity } from './user.entity';

@Entity('Message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => BoxChatEntity)
  @JoinColumn({ referencedColumnName: 'id' })
  boxChat: BoxChatEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ referencedColumnName: 'id' })
  sender: UserEntity;

  @Column({ nullable: true })
  createdDate: Date;
}
