import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

  async deleteTeacherFromLab(teacherId: string){
    const teacherModel = await this.findOne(teacherId);
    if (!teacherModel) throw new HttpException("Error when delete teacher", HttpStatus.BAD_REQUEST);
    teacherModel.labId = "";
    const res = this.teacherRepository.update(teacherId, teacherModel);
    return res;
  }

  async addTeacherToLab(teacherId: string, labId: string){
    const teacherModel = await this.findOne(teacherId);
    if (!teacherModel) throw new HttpException("Error when register student", HttpStatus.BAD_REQUEST);
    teacherModel.labId = labId;
    const res = await this.teacherRepository.update(teacherId, teacherModel);
    return res;
  }
}