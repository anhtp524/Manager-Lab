import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LaboratoryEntity } from "src/entity/laboratory.entity";
import { LabboratoryService } from "./laboratory.service";
import { LaboratoryController } from "./laboratory.controller";
import { UsersModule } from "../UserApi/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([LaboratoryEntity]),
      UsersModule
    ],
    providers: [LabboratoryService],
    controllers: [LaboratoryController],
  })
  export class LaboratoryModule {}