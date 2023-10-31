import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherEntity } from 'src/entity/teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherProjectEntity } from 'src/entity/teacherProject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity, TeacherProjectEntity])],
  providers: [TeacherService],
  controllers: [TeacherController],
  exports: [TeacherService],
})
export class TeacherModule {}
