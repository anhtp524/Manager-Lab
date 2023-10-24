import { Controller } from "@nestjs/common";
import { BoxChatService } from "./boxChat.service";

@Controller()
export class BoxChatController {
    constructor(
        private boxChatService: BoxChatService
    ){}
}