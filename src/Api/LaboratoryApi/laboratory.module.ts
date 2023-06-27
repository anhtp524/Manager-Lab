import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Laboratory } from "src/entity/laboratory.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Laboratory])],
    providers: [],
    controllers: [],
  })
  export class ProjectModule {}