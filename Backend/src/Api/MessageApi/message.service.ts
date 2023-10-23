import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "src/entity/message.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private messageRepo: Repository<MessageEntity>
    ){}

    async createMessage(message: string) {
        const messageModel = await this.messageRepo.create({message: message});
        await this.messageRepo.save(messageModel);
        return message;
    }
}