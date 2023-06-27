import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "src/entity/teacher.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Teacher])],
    providers: [],
    controllers: [],
  })
  export class ProjectModule {}