import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './Dto/users.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags("User")
@Controller("user")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBody({type: CreateUser})
  @Post("adduser")
  CreateUsers(@Body() newUser: CreateUser) {
    return this.userService.add(newUser);
  }

  @Get("getall")
  GetAllUser(){
    return this.userService.findAll();
  }
}