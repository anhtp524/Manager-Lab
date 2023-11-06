import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entity/student.entity';
import { ILike, IsNull, Like, Repository } from 'typeorm';
import { CreateStudentDto, UpdateStudentDto } from './Dto/student.dto';
import { LaboratoryEntity } from 'src/entity/laboratory.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  findAll() {
    return this.studentRepository.find();
  }

  async findStudentById(id: string) {
    try {
      return await this.studentRepository.findOneBy({ id: id });
    } catch (e) {
      throw new BadRequestException('Error when find student');
    }
  }

  async remove(id: number) {
    await this.studentRepository.delete(id);
    return 1;
  }

  async add(newStudent: CreateStudentDto) {
    const data = await this.studentRepository.create(newStudent);
    await this.studentRepository.save(data);
    return 1;
  }

  async updateStudent(id: string, updateModel: UpdateStudentDto) {
    const studentModel = await this.findStudentById(id);
    if (!studentModel)
      throw new HttpException(
        'Error when update student',
        HttpStatus.BAD_REQUEST,
      );
    studentModel.dateOfBirth = updateModel.dateOfBirth;
    studentModel.email = updateModel.email;
    studentModel.phoneNumber = updateModel.phoneNumber;
    const res = await this.studentRepository.update(id, studentModel);
    return res;
  }

  async registerForLab(studentId: string, labId: string, isRegister: boolean) {
    const studentModel = await this.findStudentById(studentId);
    if (!studentModel)
      throw new HttpException(
        'Error when register student',
        HttpStatus.BAD_REQUEST,
      );
    studentModel.lab = isRegister ? new LaboratoryEntity() : null;
    if (isRegister) {
      studentModel.lab.id = labId;
    }
    studentModel.isApproveToLab = isRegister ? false : null;
    const res = await this.studentRepository.update(studentId, studentModel);
    return studentModel;
  }

  async approveStudentToLab(studentId: string) {
    const studentModel = await this.findStudentById(studentId);
    if (!studentModel || studentModel.lab === null)
      throw new HttpException(
        'Error when register student',
        HttpStatus.BAD_REQUEST,
      );
    studentModel.isApproveToLab = true;
    const res = await this.studentRepository.update(studentId, studentModel);
    return studentModel;
  }

  async deleteOrRejectStudentFromLab(studentId: string) {
    const studentModel = await this.findStudentById(studentId);
    if (!studentModel)
      throw new HttpException(
        'Error when delete student',
        HttpStatus.BAD_REQUEST,
      );
    studentModel.isApproveToLab = false;
    studentModel.lab = null;
    const res = await this.studentRepository.update(studentId, studentModel);
    return studentModel;
  }

  async findStudentByStudentCode(studentCode: number) {
    var studentModel = await this.studentRepository.findOneBy({
      studentCode: studentCode,
    });
    return studentModel;
  }

  async getStudentInLab(labId: string, isApproveToLab: boolean) {
    var listStudent = await this.studentRepository.find({
      relations: {
        lab: true,
      },
      where: {
        lab: {
          id: labId,
        },
        isApproveToLab: isApproveToLab,
      },
    });
    return listStudent;
  }

  async GetListStudentByName(searchName: string, labId: string) {
    const listStudentModel = await this.studentRepository.find({
      where: {
        lab: {
          id: labId,
        },
        name: ILike(`%${searchName}%`),
      },
    });

    return listStudentModel;
  }
}
