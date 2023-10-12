import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherEntity } from "src/entity/teacher.entity";
import { Like, Repository } from "typeorm";
import { CreateTeacherDto } from "./Dto/teacher.dto";
import { LaboratoryEntity } from "src/entity/laboratory.entity";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
  ) {}

  async findAll() {
    return await this.teacherRepository.find();
  }

  async findTeacherById(id: string) {
    return await this.teacherRepository.findOneBy({ id });
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
    const teacherModel = await this.findTeacherById(teacherId);
    if (!teacherModel) throw new HttpException("Error when delete teacher", HttpStatus.BAD_REQUEST);
    teacherModel.lab = null
    const res = this.teacherRepository.update(teacherId, teacherModel);
    return res;
  }

  async addTeacherToLab(teacherId: string, labId: string){
    const teacherModel = await this.findTeacherById(teacherId);
    if (!teacherModel) throw new HttpException("Error when register student", HttpStatus.BAD_REQUEST);
    teacherModel.lab = new LaboratoryEntity();
    teacherModel.lab.id = labId;
    const res = await this.teacherRepository.update(teacherId, teacherModel);
    return res;
  }

  async getListTeacherByNameInLab(searchName: string, labId: string) {
    var listTeacherModel = await this.teacherRepository.find({
      relations : {
        lab : true,
      },
      where : {
        lab : {
          id : labId
        },
        name : Like(`%${searchName}%`)
      }
    });

    return listTeacherModel;
  }

  async getTeacherInLab(labId: string) {
    var listTeacherInLab = await this.teacherRepository.find({
      relations : {
        lab : true
      },
      where : {
        lab : {
          id : labId
        }
      }
    });

    return listTeacherInLab;
  }
}