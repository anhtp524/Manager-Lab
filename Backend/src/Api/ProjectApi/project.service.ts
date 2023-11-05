import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/entity/project.entity';
import { In, Repository } from 'typeorm';
import { CreateProject, ProjectAddDto } from './Dto/project.dto';
import { StudentEntity } from 'src/entity/student.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { TeacherProjectEntity } from 'src/entity/teacherProject.entity';
import {
  DetailProjectModel,
  StudentInProject,
  TeacherInProject,
} from './Dto/projectView,dto';
import { json } from 'stream/consumers';
import { TeacherEntity } from 'src/entity/teacher.entity';
import { DocumentEntity } from 'src/entity/document.entity';
import { DocumentService } from '../DocumentApi/document.service';
import { FolderPath } from 'Core/Constant/folderPath.constant';
import { ProjectStatus } from 'Core/Enum/ProjectEnum';
import { Project_StudentEntity } from 'src/entity/projectStudent.entity';
import { LaboratoryEntity } from 'src/entity/laboratory.entity';
import { CloseProjectDto } from './Dto/closeProject.dto';
import { CancelProjectDto } from './Dto/cancelProject.dto';
import { Role } from 'Core/Enum/role.enum';
import { CertificateDto } from './Dto/certificate.dto';
import { UpdateProjectDto } from './Dto/updateProject.dto';

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
    @InjectRepository(Project_StudentEntity)
    private projectStudentRepo: Repository<Project_StudentEntity>,
    private documentService: DocumentService,
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

  async add(newProject: CreateProject) {
    const result = this.projectRepository.create(newProject);
    await this.projectRepository.save(result);
    return result;
  }

  async getDetailProject(id: string) {
    const detailProject = new DetailProjectModel();
    const studentInProject = await this.projectStudentRepo.find({
      relations: {
        project: true,
        student: true,
      },
      where: {
        project: {
          id: id,
        },
      },
    });
    const teacherInProject = await this.teacherProjectRepo.find({
      relations: {
        project: true,
        teacher: true
      },
      where: {
        project: {
          id: id
        }
      }
    })
      

    detailProject.id = id;
    detailProject.name = studentInProject[0].project?.name;
    detailProject.coreTech = studentInProject[0].project?.coreTech;
    detailProject.description = studentInProject[0].project?.description;
    detailProject.students = studentInProject.map((x) => {
      const student: StudentInProject = {
        id: x.student.id,
        name: x.student.name,
        msv: x.student.studentCode,
        class: x.student.class,
      };
      return student;
    });
    detailProject.teachers = teacherInProject.map((x) => {
      const teacher: TeacherInProject = {
        id: x.teacher.id,
        name: x.teacher.name,
        email: x.teacher.email
      };
      return teacher;
    });

    return detailProject;
  }

  async createProject(
    projectAddDto: ProjectAddDto,
    isStudent: boolean,
    labId: string,
  ) {
    const projectModel = this.projectRepository.create(
      projectAddDto.projectAdd,
    );
    if (isStudent) projectModel.status = ProjectStatus.UnConfirm;
    else projectModel.status = ProjectStatus.New;
    projectModel.lab = new LaboratoryEntity();
    projectModel.lab.id = labId;
    await this.projectRepository.save(projectModel);
    if (projectAddDto.listStudent.length !== 0) {
      var studentsModel = await this.studentRepository.find({
        where: { id: In(projectAddDto.listStudent) },
      });
      if (studentsModel.length !== projectAddDto.listStudent.length)
        throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
      var studentProjectModel = studentsModel.map((student) => {
        var studentProjectModel = new Project_StudentEntity();
        studentProjectModel.project = new ProjectEntity();
        studentProjectModel.project.id = projectModel.id;
        studentProjectModel.student = student;
        return studentProjectModel;
      });

      await this.projectStudentRepo.save(studentProjectModel);
    }

    if (projectAddDto.listTeacher.length !== 0) {
      var teachersModel = await this.teacherRepo.find({
        where: { id: In(projectAddDto.listTeacher) },
      });
      if (teachersModel.length !== projectAddDto.listTeacher.length)
        throw new BadGatewayException();
      var teacherProjectsModel = teachersModel.map((teacher) => {
        var teacherProjectModel = new TeacherProjectEntity();
        teacherProjectModel.teacher = teacher;
        teacherProjectModel.project = new ProjectEntity();
        teacherProjectModel.project.id = projectModel.id;

        return this.teacherProjectRepo.create(teacherProjectModel);
      });

      await this.teacherProjectRepo.save(teacherProjectsModel);
    }

    if (
      projectAddDto.listAttachment !== null &&
      projectAddDto.listAttachment.length !== 0
    ) {
      await this.documentService.UpdateRegardingId(
        projectAddDto.listAttachment,
        projectModel.id,
        FolderPath.createdProject,
        true,
      );
    }
    return projectModel;
  }

  async GetProjectInLab(labId: string) {
    var listProjectModel = await this.projectRepository.find({
      relations: {
        lab: true,
      },
      where: {
        lab: {
          id: labId,
        },
      },
    });
    return listProjectModel;
  }

  async CloseProject(closeProjectDto: CloseProjectDto) {
    var projectModel = await this.projectRepository.findOne({
      where: {
        id: closeProjectDto.projectId,
      },
    });
    projectModel.status = ProjectStatus.Finish;
    projectModel.feedback = closeProjectDto.feedback;
    projectModel.score = closeProjectDto.score;
    projectModel.finishDate = new Date();
    await this.projectRepository.save(projectModel);
    return projectModel;
  }

  async CancelProject(projectCancel: CancelProjectDto) {
    var projectModel = await this.projectRepository.findOne({
      where: {
        id: projectCancel.projectId,
      },
    });

    projectModel.status = ProjectStatus.Cancel;
    await this.projectRepository.save(projectModel);
    return projectModel;
  }

  async ProjectOfUser(userId: string, labId: string, role: Role) {
    if (role === Role.Student) {
      const studentProjectModel = await this.projectStudentRepo.find({
        relations: ['project'],
        relationLoadStrategy: 'join',
        where: {
          student: {
            id: userId,
          },
        },
      });
      return studentProjectModel.map((x) => x.project);
    }
    else if(role === Role.Teacher) {
      const teacherProjectModel = await this.teacherProjectRepo.find({
        relations: ['project'],
        where: {
          teacher: {
            id: userId
          }
        }
      });
      return teacherProjectModel.map(t => t.project);
    }
    return [];
  }

  async GetCertificate(projectId: string, studentId: string) {
    const studentProjectModel = await this.projectStudentRepo.findOne({
      relations: ['project', 'project.lab', 'student'],
      where: {
        project: {
          id: projectId
        },
        student: {
          id: studentId
        }
      }
    });
    if(!studentProjectModel) return new CertificateDto();
    const certificateModel = new CertificateDto();
    certificateModel.student.studentName = studentProjectModel.student.name;
    certificateModel.student.class = studentProjectModel.student.class;
    certificateModel.student.studentCode = studentProjectModel.student.studentCode;
    certificateModel.student.dateOfBirth = studentProjectModel.student.dateOfBirth;
    certificateModel.project.projectName = studentProjectModel.project.name;
    certificateModel.project.score = studentProjectModel.project.score;
    certificateModel.project.finishDate = studentProjectModel.project.finishDate;
    certificateModel.labName = studentProjectModel.project.lab.name;
    return certificateModel;
  }

  async OnGoingProject(projectId: string) {
    const projectModel = await this.projectRepository.findOne({
      where: {
        id: projectId
      }
    });
    if(projectModel.status === ProjectStatus.New) {
      projectModel.status = ProjectStatus.OnGoing;
      await this.projectRepository.save(projectModel);
    }

    return projectModel;
  }

  async EditProject(updateProject: UpdateProjectDto) {
    const projectModel = await this.projectRepository.findOne({
      where: {
        id: updateProject.projectId
      }
    });
    if (projectModel.status === ProjectStatus.UnConfirm || projectModel.status === ProjectStatus.New || projectModel.status === ProjectStatus.OnGoing) {
      projectModel.coreTech = updateProject.coreTech;
      projectModel.description = updateProject.description;
      projectModel.name = updateProject.name;
      await this.projectRepository.save(projectModel);
    }
    
    return projectModel; 
  }

  async ConfirmProject(projectId: string) {
    const projectModel = await this.projectRepository.findOne({
      where: {
        id: projectId
      }
    });
    projectModel.status = ProjectStatus.New;
    await this.projectRepository.save(projectModel);
    return projectModel;
  }

  async ProjectUnconfirm(userId: string) {
    const teacherProjectModel = await this.teacherProjectRepo.find({
      relations: ['project'],
      where: {
        teacher: {
          id: userId
        },
        project: {
          status: ProjectStatus.UnConfirm
        }
      }
    });
    return teacherProjectModel.map(t => t.project);
  }
}
