import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { MessageModule } from "src/Api/MessageApi/message.module";

@Module({
    imports: [MessageModule
    ],
    providers: [ChatGateway],
    controllers: [],
    exports: []
  })
  export class ChatModulde {}