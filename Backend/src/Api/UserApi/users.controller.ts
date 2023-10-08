import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './Dto/users.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags("User")
@Controller("user")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBody({type: CreateUserDto})
  @Post("adduser")
  CreateUsers(@Body() newUser: CreateUserDto) {
    return this.userService.add(newUser);
  }

  @Get("getall")
  GetAllUser(){
    return this.userService.findAll();
  }
}