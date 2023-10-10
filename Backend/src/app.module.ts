import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './Api/UserApi/users.module';
import { ProjectModule } from './Api/ProjectApi/project.module';
import { LaboratoryModule } from './Api/LaboratoryApi/laboratory.module';
import { StudentModule } from './Api/StudentApi/student.module';
import { TeacherModule } from './Api/TeacherApi/teacher.module';
import { dataSourceOptions } from 'db/dataSource';
import { AuthModule } from 'Core/Auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    ProjectModule,
    LaboratoryModule,
    StudentModule,
    TeacherModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
