import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from 'src/entity/user.entity';
import { StudentEntity } from 'src/entity/student.entity';
import { TeacherEntity } from 'src/entity/teacher.entity';
import { CloudinaryModule } from 'Core/Cloudinary/cloudinary.module';
import { Project_StudentEntity } from 'src/entity/projectStudent.entity';
import { TeacherProjectEntity } from 'src/entity/teacherProject.entity';
import { MailModule } from 'Core/Mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, StudentEntity, TeacherEntity, Project_StudentEntity, TeacherProjectEntity]), 
    CloudinaryModule,
    MailModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}