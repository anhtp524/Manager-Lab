import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/Api/UserApi/users.service';
import { LoginDto } from './Dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entity/user.entity';
import { Role } from 'Core/Enum/role.enum';
import { StudentService } from 'src/Api/StudentApi/student.service';
import { TeacherService } from 'src/Api/TeacherApi/teacher.service';
import { Response, response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private studentService: StudentService,
    private teacherService: TeacherService,
  ) {}

  async login(userLogin: LoginDto) {
    const userModel = await this.userService.findUserByEmail(userLogin.email);
    if (!userModel) throw new UnauthorizedException('User does not exist');
    const checkPassword = await bcrypt.compare(
      userLogin.password,
      userModel.password,
    );
    if (!checkPassword) throw new UnauthorizedException('Password is wrong');
    if (userModel.role != Role.Admin) {
      const userProfile = this.userService.getProfileUser(
        userModel.id,
        userModel.role,
      );
      if (!userProfile) throw new UnauthorizedException('User is not valid');
    }
    const accessKey = 'access_key';
    const accessToken = await this.signToken(userModel, accessKey, '2h');
    return {
      id: userModel.id,
      role: userModel.role,
      accessToken: accessToken,
    };
  }

  async signToken(user: UserEntity, key: string, time: string) {
    const payload = { sub: { userId: user.id, role: user.role } };
    const token = await this.jwtService.sign(payload, {
      secret: key,
      expiresIn: time,
    });
    return token;
  }
}
