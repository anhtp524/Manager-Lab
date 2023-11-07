import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoxChatEntity } from "src/entity/boxChat.entity";
import { BoxChat_UserEntity } from "src/entity/boxChatUser.entity";
import { BoxChatController } from "./boxChat.controller";
import { BoxChatService } from "./boxChat.service";
import { UsersModule } from "../UserApi/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([BoxChatEntity, BoxChat_UserEntity]),
        UsersModule
    ],
    controllers: [BoxChatController],
    providers: [BoxChatService],
    exports: [BoxChatService]
})
export class BoxChatModule {}