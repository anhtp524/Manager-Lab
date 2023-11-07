import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoxChatEntity } from "src/entity/boxChat.entity";
import { BoxChat_UserEntity } from "src/entity/boxChatUser.entity";
import { Repository } from "typeorm";
import { CreateBoxChatDto } from "./Dto/createBoxChat.dto";
import { UserEntity } from "src/entity/user.entity";

@Injectable()
export class BoxChatService {
    constructor(
        @InjectRepository(BoxChatEntity)
        private boxChatRepo: Repository<BoxChatEntity>,
        @InjectRepository(BoxChat_UserEntity)
        private boxChat_userRepo: Repository<BoxChat_UserEntity>
    ){}

    async GetListBoxChat(userId: string, userName: string) {
        var listBoxChat_UserModel = await this.boxChat_userRepo.find({
            relations: {
                boxChat: true
            },
            where: {
                user: {
                    id: userId
                }
            }
        })
        var listBoxChat = listBoxChat_UserModel.map(x => {
            const nameChat = x.boxChat.name.split(", ").filter(name => name != userName);
            x.boxChat.name = nameChat.join(', ')
            return x.boxChat;
        });
        return listBoxChat;
    }

    async CreateBoxChat(newBoxChat: CreateBoxChatDto){
        const boxChatModel = await this.boxChatRepo.create({name: newBoxChat.name});
        await this.boxChatRepo.save(boxChatModel);
        const listBoxChat_UserModel = newBoxChat.userId.map(userId => {
           const model = new BoxChat_UserEntity();
           model.boxChat = boxChatModel;
           model.user = new UserEntity();
           model.user.id = userId;
           return model;
        })
        await this.boxChat_userRepo.save(listBoxChat_UserModel);
        return 1;
    }
}