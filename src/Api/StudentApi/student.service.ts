import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "src/entity/student.entity";
import { Repository } from "typeorm";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll() {
    return this.studentRepository.find();
  }

  findOne(id: string) {
    return this.studentRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.studentRepository.delete(id);
    return 1;
  }

//   async add(newuser: CreateUser){
//     const data = await this.projectRepository.create(newuser);
//     await this.projectRepository.save(data);
//     return 1;
//   }
}