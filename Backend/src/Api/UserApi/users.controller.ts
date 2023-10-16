import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UploadFileDto } from './Dto/users.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CloudinaryService } from 'Core/Cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags("User")
@Controller("user")
export class UsersController {
  constructor(private readonly userService: UsersService, private cloudService: CloudinaryService) {}

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

  @ApiConsumes('multipart/form-data')
  @ApiBody({type : UploadFileDto})
  @UseInterceptors(FileInterceptor('file'))
  @Post("uploadFile")
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudService.uploadImageToCloudinary(file);
    return result.url;
  }
}