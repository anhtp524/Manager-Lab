import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LaboratoryEntity } from "src/entity/laboratory.entity";
import { LabboratoryService } from "./laboratory.service";
import { LaboratoryController } from "./laboratory.controller";

@Module({
    imports: [TypeOrmModule.forFeature([LaboratoryEntity])],
    providers: [LabboratoryService],
    controllers: [LaboratoryController],
  })
  export class LaboratoryModule {}