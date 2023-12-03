import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { CreateUserDto } from './Dto/users.dto';
import { Role } from 'Core/Enum/role.enum';
import { StudentEntity } from 'src/entity/student.entity';
import { TeacherEntity } from 'src/entity/teacher.entity';
import { emptyUUID } from 'Core/Constant/uuid.constant';
import * as bcrypt from 'bcrypt';
import { Project_StudentEntity } from 'src/entity/projectStudent.entity';
import { MailerService } from '@nestjs-modules/mailer';
import randomPassword from 'Core/Helper/UtilityHelper';
import { ChangePasswordDto } from './Dto/changePass.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
    @InjectRepository(Project_StudentEntity)
    private projectStudentRepo: Repository<Project_StudentEntity>,
    private mailSerivce: MailerService
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string) {
    try {
      await this.usersRepository.delete(id);
      return 1;
    } catch (e) {
      throw new BadRequestException('Error when delete user');
    }
  }

  async add(newuser: CreateUserDto) {
    var userAdd = {
      email: newuser.email,
      password: newuser.password,
      role: newuser.role,
    };
    const userModel = await this.usersRepository.create(userAdd);
    userModel.password = await bcrypt.hash(newuser.password, 10);
    await this.usersRepository.save(userModel);
    if (newuser.role === Role.Student) {
      var studentModel = this.studentRepository.create(newuser.studentAdd);
      studentModel.email = newuser.email;
      studentModel.user = userModel;
      try {
        await this.studentRepository.save(studentModel);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } else if (newuser.role === Role.Teacher) {
      var teacherModel = this.teacherRepository.create(newuser.teacherAdd);
      teacherModel.email = newuser.email;
      teacherModel.user = userModel;
      try {
        await this.teacherRepository.save(teacherModel);
      } catch (ex) {
        throw new BadRequestException(ex.message);
      }
    }
    return 1;
  }

  async findUserByEmail(email: string) {
    const userModel = await this.usersRepository.findOneBy({ email: email });
    if (!userModel) throw new BadRequestException('Error when find user');
    return userModel;
  }

  async getProfileUser(userId: string, role: Role) {
    var profileUser: StudentEntity | TeacherEntity;
    if (role == Role.Student) {
      profileUser = await this.studentRepository.findOne({
        relations: {
          //project : true,
          lab: true,
        },
        where: {
          user: {
            id: userId,
          },
        },
      });
    } else if (role == Role.Teacher) {
      profileUser = await this.teacherRepository.findOne({
        relations: {
          lab: true,
        },
        where: {
          user: {
            id: userId,
          },
        },
      });
    }

    return { ...profileUser, userId: userId };
  }

  async getLabIdByUserId(userId: string, role: Role) {
    const userProfile = await this.getProfileUser(userId, role);
    return userProfile.lab.id;
  }

  async searchUserForChat(searchName: string) {
    const listStudentModel = await this.studentRepository.find({
      relations: {
        user: true,
      },
      where: {
        name: ILike(`%${searchName}%`),
      },
    });
    const listStudentUser = listStudentModel.map((s) => {
      return {
        userId: s.user.id,
        name: s.name,
      };
    });

    const listTeacherModel = await this.teacherRepository.find({
      relations: {
        user: true,
      },
      where: {
        name: ILike(`%${searchName}%`),
      },
    });
    const listTeacherUser = listTeacherModel.map((t) => {
      return {
        userId: t.user.id,
        name: t.name,
      };
    });
    const listUser = [...listStudentUser, ...listTeacherUser];
    return listUser;
  }

  async forgetPassword(email: string) {
    var userModel = await this.findUserByEmail(email);
    var newPass = randomPassword(6);
    console.log(newPass);
    try {
      await this.mailSerivce.sendMail({
        to: "anhtp524@gmail.com",
        subject: "Quên mật khẩu",
        text: `Mật khẩu mới của bạn là ${newPass}.
              Mời bạn đăng nhập lại hệ thống.`
      })
    }
    catch {
      throw new BadRequestException("Error when sent email")
    }
    userModel.password = await bcrypt.hash(newPass, 10);
    await this.usersRepository.save(userModel);
    return 1; 
  }

  async changePassword(userId: string, passwordDto: ChangePasswordDto) {
    var userModel = await this.findOne(userId);
    if(!userModel) throw new BadRequestException("Error when get user by id");
    var checkPassword = await bcrypt.compare(passwordDto.oldPassword, userModel.password);
    if (checkPassword == false) throw new BadRequestException("Old password is wrong");
    userModel.password = await bcrypt.hash(passwordDto.newPassword, 10);
    await this.usersRepository.save(userModel);
    return 1;
  }
}
