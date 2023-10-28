import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './Dto/auth.dto';
import { CookieOptions, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @ApiBody({ type: LoginDto })
  @Post('login')
  async Login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginDto);
    response.cookie('Token', result.accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      // domain: 'https://localhost:3000',
      // path: '/',
    });

    return result;
  }

  @Get('checkauthentication')
  async CheckAuthentication(@Req() request: Request) {
    try {
      const dateTimeNow = Math.floor(Date.now() / 1000);
      const authInfo = this.jwtService.decode(request.cookies['Token']);
      if (authInfo === null) {
      }
      return {
        isAuthenticated: dateTimeNow < authInfo['exp'],
        role: authInfo['sub']['role'],
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          // error: 'Loi',
        },
        HttpStatus.UNAUTHORIZED,
        {
          cause: error,
        },
      );
    }
  }
  @Get('logout')
  async Logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Token', {
      httpOnly: true,
      sameSite: 'strict',
      // domain: 'https://localhost:3000',
      // path: '/',
    });
    return true;
  }
}
