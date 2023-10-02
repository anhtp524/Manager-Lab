import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectEntity } from "src/entity/project.entity";
import { Repository } from "typeorm";
import { CreateProject } from "./Dto/project.dto";
import { StudentEntity } from "src/entity/student.entity";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
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
    //var testid = UUID.createFromHexString(id)
    // var studentInProject = await this.projectRepository.createQueryBuilder("Project")
    //                         .where("Project.id = :id", {id: id})
    //                         .leftJoinAndSelect("Student.projectIdId", 'Student', "Student.projectIdId = Project.id")
    //                         .getMany()
    var tes1 = await this.studentRepository.createQueryBuilder("Student")
    //  .leftJoinAndSelect("Student.project", "Project", "Student.project = Project.Id")
    .getMany();
    //var tes2 = tes1[0].projectId;
    var tes3 = await this.studentRepository.find({relations: ["project"]});
    return tes3;               
  }
}