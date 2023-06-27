import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "src/entity/teacher.entity";
import { Repository } from "typeorm";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherService: Repository<Teacher>,
  ) {}

  findAll() {
    return this.teacherService.find();
  }

  findOne(id: string) {
    return this.teacherService.findOneBy({ id });
  }

  async remove(id: number) {
    await this.teacherService.delete(id);
    return 1;
  }

//   async add(newuser: CreateUser){
//     const data = await this.projectRepository.create(newuser);
//     await this.projectRepository.save(data);
//     return 1;
//   }
}