import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { MessageService } from "./message.service";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateMessageDto } from "./Dto/createMessage.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Message")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("message")
export class MessageController {
    constructor(
        private msgService: MessageService
    ){}

    @Get("getallmsg/:boxchatId")
    async GetAllMessage(@Param("boxchatId") boxchatId: string) {
        const res = await this.msgService.getAllMessage(boxchatId);
        return res;
    }

    @ApiBody({type: CreateMessageDto})
    @Post("addnewmsg")
    async AddNewMsg(@Body() newMsg: CreateMessageDto) {
        const res = this.msgService.createMessage(newMsg);
        return res;
    }
}