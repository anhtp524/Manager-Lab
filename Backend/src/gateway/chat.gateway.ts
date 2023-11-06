import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageDto } from 'src/Api/MessageApi/Dto/createMessage.dto';
import { MessageService } from 'src/Api/MessageApi/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messageService: MessageService) {}

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() message: CreateMessageDto) {
    var response = await this.messageService.createMessage(message);
    console.log(response);
    this.server.emit('receiveMessage', message);
    return response;
  }
}
