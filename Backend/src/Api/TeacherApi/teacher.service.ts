import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherEntity } from "src/entity/teacher.entity";
import { Repository } from "typeorm";
import { CreateTeacherDto } from "./Dto/teacher.dto";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
  ) {}

  findAll() {
    return this.teacherRepository.find();
  }

  findOne(id: string) {
    return this.teacherRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.teacherRepository.delete(id);
    return 1;
  }

  async add(newTeacher: CreateTeacherDto){
    const data = await this.teacherRepository.create(newTeacher);
    await this.teacherRepository.save(data);
    return 1;
  }
}