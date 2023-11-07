import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  sender: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  boxChatId: string;
  @ApiProperty()
  userName: string;
}
