import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './Dto/users.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags("User")
@Controller("user")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBody({type: CreateUserDto})
  @Post("adduser")
  CreateUsers(@Body() newUser: CreateUserDto) {
    return this.userService.add(newUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("getall")
  GetAllUser(@Req() req){
    var test = req.user;
    console.log(test);
    return this.userService.findAll();
  }
}