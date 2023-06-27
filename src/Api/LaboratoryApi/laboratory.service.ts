import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Laboratory } from "src/entity/laboratory.entity";
import { Repository } from "typeorm";

@Injectable()
export class LabboratoryService {
  constructor(
    @InjectRepository(Laboratory)
    private labRepository: Repository<Laboratory>,
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

//   async add(newuser: CreateUser){
//     const data = await this.projectRepository.create(newuser);
//     await this.projectRepository.save(data);
//     return 1;
//   }
}