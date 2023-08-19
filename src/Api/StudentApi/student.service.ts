import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentEntity } from "src/entity/student.entity";
import { IsNull, Repository } from "typeorm";
import { CreateStudentDto, UpdateStudentDto } from "./Dto/student.dto";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
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

  async add(newStudent: CreateStudentDto){
    const data = await this.studentRepository.create(newStudent);
    await this.studentRepository.save(data);
    return 1;
  }

  async updateStudent(id: string, updateModel: UpdateStudentDto){
    const studentModel = await this.findOne(id);
    if (!studentModel) throw new HttpException("Error when update student", HttpStatus.BAD_REQUEST);
    studentModel.dateOfBirth = updateModel.dateOfBirth;
    studentModel.email = updateModel.email;
    studentModel.phoneNumber = updateModel.phoneNumber;
    const res = await this.studentRepository.update(id, studentModel);
    return res;
  }
}