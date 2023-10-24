import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './Dto/users.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CloudinaryService } from 'Core/Cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Payload } from 'Core/CoreModel/Payload.model';
import { plainToInstance } from 'class-transformer';


@ApiTags("User")
@Controller("user")
export class UsersController {
  constructor(private readonly userService: UsersService, private cloudService: CloudinaryService) {}

  @ApiBody({type: CreateUserDto})
  @Post("adduser")
  CreateUsers(@Body() newUser: CreateUserDto) {
    return this.userService.add(newUser);
  }

  @ApiBearerAuth()
  @Get("getall")
  @UseGuards(AuthGuard('jwt'))
  async GetAllUser(@Req() req: Request){
    var test = plainToInstance(Payload, req.user);
    return await this.userService.findAll();
  }

  // @Post("TestuploadFile")
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({type : UploadFileDto})
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   const result = await this.cloudService.uploadImageToCloudinary(file);
  //   return result.url;
  // }

  @ApiBearerAuth()
  @Get("getprofileuser")
  @UseGuards(AuthGuard('jwt'))
  async GetProfileUser(@Req() req ) {
    const userPayload : Payload = req.user;
    var result = await this.userService.getProfileUser(userPayload.userId, userPayload.role);
    return result;
  }
  
}