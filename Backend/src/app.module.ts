import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './Api/UserApi/users.module';
import { ProjectModule } from './Api/ProjectApi/project.module';
import { LaboratoryModule } from './Api/LaboratoryApi/laboratory.module';
import { StudentModule } from './Api/StudentApi/student.module';
import { TeacherModule } from './Api/TeacherApi/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '17112001',
      database: 'hello_postgre',
      entities: [__dirname + '/**/entity/*.entity{.ts,.js}'], 
      synchronize: true,
      autoLoadEntities: true,
      migrations: ["dist/migrations/*{.ts,.js}"],
      migrationsTableName: "migrations_typeorm",
      migrationsRun: true
    }),
    UsersModule,
    ProjectModule,
    LaboratoryModule,
    StudentModule,
    TeacherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
