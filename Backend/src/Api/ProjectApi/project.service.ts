import { BadGatewayException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectEntity } from "src/entity/project.entity";
import { In, Repository } from "typeorm";
import { CreateProject, ProjectAddDto } from "./Dto/project.dto";
import { StudentEntity } from "src/entity/student.entity";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { TeacherProjectEntity } from "src/entity/teacherProject.entity";
import { DetailProjectModel, StudentInProject, TeacherInProject } from "./Dto/projectView,dto";
import { json } from "stream/consumers";
import { TeacherEntity } from "src/entity/teacher.entity";
import { DocumentEntity } from "src/entity/document.entity";
import { DocumentService } from "../DocumentApi/document.service";
import { FolderPath } from "Core/Constant/folderPath.constant";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    @InjectRepository(TeacherProjectEntity)
    private teacherProjectRepo: Repository<TeacherProjectEntity>,
    @InjectRepository(TeacherEntity)
    private teacherRepo: Repository<TeacherEntity>,
    private documentService: DocumentService
  ) {}

  findAll() {
    return this.projectRepository.find();
  }

  findOne(id: string) {
    return this.projectRepository.findOneBy({ id: id });
  }

  async remove(id: number) {
    await this.projectRepository.delete(id);
    return 1;
  }

  async add(newProject: CreateProject){
    const result = this.projectRepository.create(newProject);
    await this.projectRepository.save(result);
    return result;
  }

  async getDetailProject(id: string){
    var detailProject = new DetailProjectModel();
    var studentInProject = await this.studentRepository.createQueryBuilder("s")
    //.select(["s.project"])
    .leftJoinAndSelect("s.project", "Project", "Project.id = :id", {id: id})
    //.where("s.isApproveToProject = :isApproval", {isApproval: true})
    .getMany();
    var teacherInProject = await this.teacherProjectRepo.createQueryBuilder("tp")
    .leftJoin("tp.project", "project", "project.id = :id", {id: id})
    .leftJoinAndSelect("tp.teacher", "teacher")    
    .getMany();

    detailProject.id = id;
    detailProject.name = studentInProject[0].project.name;
    detailProject.coreTech = studentInProject[0].project.coreTech;
    detailProject.description = studentInProject[0].project.description;
    detailProject.students = studentInProject.map(x => {
      let student: StudentInProject = {
        name: x.name,
        msv: x.studentCode,
        class: x.class
      }
      return student;
    })
    detailProject.teachers = teacherInProject.map(x => {
      let teacher: TeacherInProject = {
        name: x.teacher.name
      }
      return teacher;
    })

    return studentInProject;             
  }

  async registerStudentIntoProject(projectId: string, studentId: string){
    var studentModel = await this.studentRepository.findOneBy({id: studentId});
    if (!studentModel) throw new HttpException("Error when find student", HttpStatus.BAD_REQUEST);
    studentModel.project = new ProjectEntity();
    studentModel.project.id = projectId;
    studentModel.isApproveToProject = false;
    const res = await this.studentRepository.update(studentId, studentModel);
    return res;
  }

  async approveToProjectByTeacher(projectId, studentId: string, teacherId: string){
    var studentModel = await this.studentRepository.findOneBy({id: studentId});
    if (!studentModel) throw new HttpException("Error when find student", HttpStatus.BAD_REQUEST);
    if (studentModel.project.id !== projectId) throw new HttpException("Invalid project", HttpStatus.BAD_REQUEST);
    studentModel.isApproveToProject = true;
    const res = await this.studentRepository.update(studentId, studentModel);
    return res;
  }

  async createProject(projectAddDto: ProjectAddDto){
    const projectModel = this.projectRepository.create(projectAddDto.projectAdd);
    await this.projectRepository.save(projectModel);
    if (projectAddDto.listStudent) {
      var studentsModel = await this.studentRepository.find({where : {id: In(projectAddDto.listStudent)}});
      if(studentsModel.length !== projectAddDto.listStudent.length) throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
      var updateStudentModel = studentsModel.map(student => {
        student.project = new ProjectEntity();
        student.project.id = projectModel.id;
        //student.isApproveToProject = true;
        return student;
      })

      await this.studentRepository.save(updateStudentModel);
    }

    if(projectAddDto.listTeacher) {
      var teachersModel = await this.teacherRepo.find({where: {id: In(projectAddDto.listTeacher)}});
      if(teachersModel.length !== projectAddDto.listTeacher.length) throw new BadGatewayException();
      var teacherProjectsModel = teachersModel.map(teacher => {
          var teacherProjectModel = new TeacherProjectEntity();
          teacherProjectModel.teacher = new TeacherEntity();
          teacherProjectModel.project = new ProjectEntity();
          teacherProjectModel.teacher.id = teacher.id;
          teacherProjectModel.project.id = projectModel.id;
          
          return this.teacherProjectRepo.create(teacherProjectModel);
      })

      await this.teacherProjectRepo.save(teacherProjectsModel);

      if(projectAddDto.listAttachment !== null || projectAddDto.listAttachment.length !== 0) {
        await this.documentService.UpdateRegardingId(projectAddDto.listAttachment, projectModel.id, FolderPath.createdProject, false);
        
      }
    }
    return 1;
  }

  async GetProjectInLab(labId: string) {
    var listProjectModel = await this.projectRepository.find({
      relations : {
        lab : true
      },
      where : {
        lab : {
          id : labId
        }
      }
    });
    return 1;
  }
}