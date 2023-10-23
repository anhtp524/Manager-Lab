import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server} from "socket.io";
import { MessageService } from "src/Api/MessageApi/message.service";

@WebSocketGateway({
    cors : {
        origin: "*"
    }
})
export class ChatGateway {
    @WebSocketServer()
    server: Server

    constructor(
        private messageService: MessageService
    ){}

    @SubscribeMessage("sendMessage")
    async handleSendMessage(@MessageBody() message: string){
        var test = await this.messageService.createMessage(message);
        console.log(test);
        return test;
    }
}