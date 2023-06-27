import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/entity/project.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: string) {
    return this.projectRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.projectRepository.delete(id);
    return 1;
  }

//   async add(newuser: CreateUser){
//     const data = await this.projectRepository.create(newuser);
//     await this.projectRepository.save(data);
//     return 1;
//   }
}