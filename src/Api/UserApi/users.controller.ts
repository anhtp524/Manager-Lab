import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './users.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { type } from 'os';

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