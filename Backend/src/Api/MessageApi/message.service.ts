import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "src/entity/message.entity";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./Dto/createMessage.dto";
import { BoxChatEntity } from "src/entity/boxChat.entity";
import { UserEntity } from "src/entity/user.entity";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private messageRepo: Repository<MessageEntity>
    ){}

    async createMessage(message: CreateMessageDto) {
        const messageModel = await this.messageRepo.create({message: message.message});
        messageModel.boxChat = new BoxChatEntity();
        messageModel.boxChat.id = message.boxChatId;
        messageModel.sender = new UserEntity();
        messageModel.sender.id = message.sender;
        await this.messageRepo.save(messageModel);
        return message;
    }
}