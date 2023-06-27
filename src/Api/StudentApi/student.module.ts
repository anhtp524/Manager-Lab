import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "src/entity/student.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
    providers: [],
    controllers: [],
  })
  export class ProjectModule {}