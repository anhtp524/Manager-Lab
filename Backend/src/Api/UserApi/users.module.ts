import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from 'src/entity/user.entity';
import { StudentEntity } from 'src/entity/student.entity';
import { TeacherEntity } from 'src/entity/teacher.entity';
import { CloudinaryModule } from 'Core/Cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, StudentEntity, TeacherEntity]), CloudinaryModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}