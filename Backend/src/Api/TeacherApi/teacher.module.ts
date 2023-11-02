import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from 'src/entity/teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherProjectEntity } from 'src/entity/teacherProject.entity';
import { UsersModule } from '../UserApi/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity, TeacherProjectEntity]),
    UsersModule
],
  providers: [TeacherService],
  controllers: [TeacherController],
  exports: [TeacherService],
})
export class TeacherModule {}
