import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LaboratoryEntity } from "src/entity/laboratory.entity";
import { Repository } from "typeorm";
import { CreateLaboratoryDto } from "./Dto/laboratory.dto";

@Injectable()
export class LabboratoryService {
  constructor(
    @InjectRepository(LaboratoryEntity)
    private labRepository: Repository<LaboratoryEntity>,
  ) {}

  findAll() {
    return this.labRepository.find();
  }

  findOne(id: string) {
    return this.labRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.labRepository.delete(id);
    return 1;
  }

  async add(newLab: CreateLaboratoryDto){
    var newLabModel = await this.labRepository.create(newLab);
    await this.labRepository.save(newLabModel);
    return newLabModel;
  }

  async getDetailLab(id: string, userId: string) {
    var detailLabModel = await this.labRepository.findOne({
      relations: {
        teacher: true
      },
      where: {
        id: id
      }
    });
    const checkLabHead = userId === detailLabModel.teacher.id;
    return {
      ...detailLabModel,
      isLabHead: checkLabHead
    }
  }
}