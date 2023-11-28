import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './Dto/users.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CloudinaryService } from 'Core/Cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { Payload } from 'Core/CoreModel/Payload.model';
import { plainToInstance } from 'class-transformer';
import { SearchNameDto } from '../TeacherApi/Dto/teacher.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from './Dto/sendMail.dto';
import randomPassword from 'Core/Helper/UtilityHelper';
import { ChangePasswordDto } from './Dto/changePass.dto';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private cloudService: CloudinaryService,
    private mailSerivce: MailerService,
  ) {}

  @ApiBody({ type: CreateUserDto })
  @Post('adduser')
  CreateUsers(@Body() newUser: CreateUserDto) {
    return this.userService.add(newUser);
  }

  @ApiBearerAuth()
  @Get('getall')
  @UseGuards(AuthGuard('jwt'))
  async GetAllUser(@Req() req: Request) {
    var test = plainToInstance(Payload, req.user);
    return await this.userService.findAll();
  }

  @ApiBearerAuth()
  @Get('getprofileuser')
  @UseGuards(AuthGuard('jwt'))
  async GetProfileUser(@Req() req) {
    const userPayload: Payload = req.user;
    var result = await this.userService.getProfileUser(
      userPayload.userId,
      userPayload.role,
    );
    return result;
  }

  @ApiBearerAuth()
  @ApiBody({ type: SearchNameDto })
  @Post('getuserforchat')
  @UseGuards(AuthGuard('jwt'))
  async GetUserForChat(@Body() searchNameDto: SearchNameDto) {
    const result = await this.userService.searchUserForChat(
      searchNameDto.searchName,
    );
    return result;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('forgetpassword')
  async forgetPassword(@Req() req) {
    const { userId, role } = req.user;

    const res = await this.userService.forgetPassword(userId);
    return res;
  }

  @ApiBody({ type: ChangePasswordDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('changepassword')
  async changePassword(
    @Body() passwordDto: ChangePasswordDto,
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userId = req.user.userId;
    const res = await this.userService.changePassword(userId, passwordDto);
    response.clearCookie('Token', {
      httpOnly: true,
      sameSite: 'strict',
    });
    return res;
  }
}
