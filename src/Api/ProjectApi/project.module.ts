import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "src/entity/project.entity";
import { ProjectService } from "./project.service";

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    providers: [ProjectService],
    controllers: [],
  })
  export class ProjectModule {}