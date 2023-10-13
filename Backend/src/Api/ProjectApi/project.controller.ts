import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { ProjectService } from "./project.service";
import { AprrovalStudentToProjectDto, CreateProject, ProjectAddDto, RegisterStudentToProjectDto } from "./Dto/project.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Project")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get("getall")
  GetAllProject(@Req() req){
    console.log(req.user);
    
    return this.projectService.findAll();
  }

  // @Get("/:id")
  // GetProjectById(@Param('id') id: string){
  //   return this.projectService.findOne(id)
  // }

  @ApiBody({type: CreateProject})
  @Post("addproject")
  async AddProject(@Body() newProject: CreateProject){
    const result = await this.projectService.add(newProject);
    return result;
  }

  @Get("getdetail/:id")
  async GetDetailProject(@Param('id') id: string){
    var result = await this.projectService.getDetailProject(id);
    return result;
  }

  @ApiBody({type: RegisterStudentToProjectDto})
  @Post("registerstudenttoproject")
  async RegisterStudentToProject(@Body() registerStudentDto: RegisterStudentToProjectDto){
    var result = await this.projectService.registerStudentIntoProject(registerStudentDto.projectId, registerStudentDto.studentId);
    return result;
  }

  @ApiBody({type: AprrovalStudentToProjectDto})
  @Post("approvestudenttoproject")
  async ApproveStudentToProject(@Body() registerStudentDto: AprrovalStudentToProjectDto){
    var result = await this.projectService.approveToProjectByTeacher(registerStudentDto.projectId, registerStudentDto.studentId, "");
    return result;
  }

  @ApiBody({type: ProjectAddDto})
  @Post("createproject")
  async CreateProject(@Body() projectAddDto: ProjectAddDto){
    var result = await this.projectService.createProject(projectAddDto);
    return result;
  }

  @Get("getprojectinlab/:id")
  async GetProjectInLab(labId: string) {
    var res = await this.projectService.GetProjectInLab(labId);
    return res;
  }

}