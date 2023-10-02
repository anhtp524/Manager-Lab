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

  async registerForLab(studentId: string, labId: string){
    const studentModel = await this.findOne(studentId);
    if (!studentModel) throw new HttpException("Error when register student", HttpStatus.BAD_REQUEST);
    studentModel.labId = labId;
    studentModel.isApproveToLab = false;
    const res = await this.studentRepository.update(studentId, studentModel);
    return res;
  }

  async approveStudentToLab(studentId: string){
    const studentModel = await this.findOne(studentId);
    if (!studentModel || studentModel.labId === null) throw new HttpException("Error when register student", HttpStatus.BAD_REQUEST);
    studentModel.isApproveToLab = true;
    const res = await this.studentRepository.update(studentId, studentModel);
    return res;
  }

  async deleteStudentFromLab(studentId: string){
    const studentModel = await this.findOne(studentId);
    if (!studentModel) throw new HttpException("Error when delete student", HttpStatus.BAD_REQUEST);
    studentModel.isApproveToLab = false;
    studentModel.labId = null;
    const res = await this.studentRepository.update(studentId, studentModel);
    return res;
  }
}