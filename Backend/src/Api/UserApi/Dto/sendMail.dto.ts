import { ApiProperty } from "@nestjs/swagger";

export class SendMailDto {
    @ApiProperty()
    email: string;

}