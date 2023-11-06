import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BoxChatService } from './boxChat.service';
import { CreateBoxChatDto } from './Dto/createBoxChat.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('BoxChat')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('boxchat')
export class BoxChatController {
  constructor(private boxChatService: BoxChatService) {}

  @Get('getallboxchat')
  async GetListBoxChat(@Req() req) {
    const { userId, role } = req.user;
    const res = await this.boxChatService.GetListBoxChat(userId);
    return res;
  }

  @ApiBody({ type: CreateBoxChatDto })
  @Post('createboxchat')
  async CreateBoxChat(@Body() newBoxChat: CreateBoxChatDto, @Req() req) {
    newBoxChat.userId.push(req.user.userId);
    const res = await this.boxChatService.CreateBoxChat(newBoxChat);
    return res;
  }
}
