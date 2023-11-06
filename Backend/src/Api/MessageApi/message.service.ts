import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entity/message.entity';
import { In, Repository } from 'typeorm';
import { CreateMessageDto } from './Dto/createMessage.dto';
import { BoxChatEntity } from 'src/entity/boxChat.entity';
import { UserEntity } from 'src/entity/user.entity';
import { StudentEntity } from 'src/entity/student.entity';
import { TeacherEntity } from 'src/entity/teacher.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
    @InjectRepository(StudentEntity)
    private studentRepo: Repository<StudentEntity>,
    @InjectRepository(TeacherEntity)
    private teacherRepo: Repository<TeacherEntity>,
  ) {}

  async createMessage(message: CreateMessageDto) {
    const messageModel = await this.messageRepo.create({
      message: message.message,
    });
    messageModel.boxChat = new BoxChatEntity();
    messageModel.boxChat.id = message.boxChatId;
    messageModel.sender = new UserEntity();
    messageModel.sender.id = message.sender;
    messageModel.createdDate = new Date();

    await this.messageRepo.save(messageModel);
    return message;
  }

  async getAllMessage(boxChatId: string) {
    const listMsgModel = await this.messageRepo.find({
      relations: {
        sender: true,
      },
      where: {
        boxChat: {
          id: boxChatId,
        },
      },
      order: {
        createdDate: 'ASC',
      },
    });

    const listUserId = listMsgModel.map((msg) => msg.sender.id);
    const listStudentUser = await this.studentRepo.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: In(listUserId),
        },
      },
    });
    const listStudentName = listStudentUser.map((s) => {
      return {
        userId: s.user.id,
        name: s.name,
      };
    });
    const listTeacherUser = await this.teacherRepo.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: In(listUserId),
        },
      },
    });
    const listTeacherName = listTeacherUser.map((t) => {
      return {
        userId: t.user.id,
        name: t.name,
      };
    });

    const listUserName = [...listStudentName, ...listTeacherName];

    const result = listMsgModel.map((msg) => {
      var userName = listUserName.find((u) => u.userId === msg.sender.id);
      return {
        message: msg.message,
        user: userName,
        createdDate: msg.createdDate,
      };
    });

    return result;
  }
}
