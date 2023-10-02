import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectEntity } from "src/entity/project.entity";
import { Repository } from "typeorm";
import { CreateProject } from "./Dto/project.dto";
import { StudentEntity } from "src/entity/student.entity";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { TeacherProjectEntity } from "src/entity/teacherProject.entity";
import { DetailProjectModel } from "./Dto/projectView,dto";
import { json } from "stream/consumers";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    @InjectRepository(TeacherProjectEntity)
    private teacherProjectRepo: Repository<TeacherProjectEntity>,
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
    var studentInProject = await this.studentRepository.createQueryBuilder("s")
    //.select(["s.name", "s.msv"])
    .leftJoinAndSelect("s.project", "project", "project.id = :id", {id: id})
    .getMany();
    var teacherInProject = await this.teacherProjectRepo.createQueryBuilder("tp")
    //.select(["tp.project.id", "tp.teacher.id"])
    .leftJoinAndSelect("tp.project", "project", "project.id = :id", {id: id})
    .leftJoinAndSelect("tp.teacher", "teacher")    
    .getMany();
    //var tes3 = await this.studentRepository.find({relations: ["project"]});
    // var detailProject: DetailProjectModel = {
    //   name: studentInProject[0].project.
    // }
    var test = JSON.parse(studentInProject[0].project)
    return test.name;             
  }
}