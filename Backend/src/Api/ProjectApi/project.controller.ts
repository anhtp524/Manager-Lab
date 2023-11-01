import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import {
  AprrovalStudentToProjectDto,
  CreateProject,
  ProjectAddDto,
  RegisterStudentToProjectDto,
} from './Dto/project.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'Core/Enum/role.enum';
import { UsersService } from '../UserApi/users.service';
import { CloseProjectDto } from './Dto/closeProject.dto';
import { CancelProjectDto } from './Dto/cancelProject.dto';

@ApiTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UsersService
  ) {}

  @Get('getall')
  GetAllProject(@Req() req) {
    console.log(req.user);

    return this.projectService.findAll();
  }

  // @Get("/:id")
  // GetProjectById(@Param('id') id: string){
  //   return this.projectService.findOne(id)
  // }

  @ApiBody({ type: CreateProject })
  @Post('addproject')
  async AddProject(@Body() newProject: CreateProject) {
    const result = await this.projectService.add(newProject);
    return result;
  }

  @Get('getdetail/:id')
  async GetDetailProject(@Param('id') id: string) {
    const result = await this.projectService.getDetailProject(id);
    return result;
  }

  // @ApiBody({ type: RegisterStudentToProjectDto })
  // @Post('registerstudenttoproject')
  // async RegisterStudentToProject(
  //   @Body() registerStudentDto: RegisterStudentToProjectDto,
  //   @Req() req,
  // ) {
  //   const result = await this.projectService.registerStudentIntoProject(
  //     registerStudentDto.projectId,
  //     req.user.userId,
  //   );
  //   return result;
  // }

  // @ApiBody({ type: AprrovalStudentToProjectDto })
  // @Post('approvestudenttoproject')
  // async ApproveStudentToProject(
  //   @Body() approvalStudentDto: AprrovalStudentToProjectDto,
  // ) {
  //   const result = await this.projectService.approveToProjectByTeacher(
  //     approvalStudentDto.projectId,
  //     approvalStudentDto.studentId,
  //     '',
  //   );
  //   return result;
  // }

  @ApiBody({ type: ProjectAddDto })
  @Post('createproject')
  async CreateProject(@Body() projectAddDto: ProjectAddDto, @Req() req) {
    const user = req.user;
    const userProfile = await this.userService.getProfileUser(user.userId, user.role)
    var isStudent: boolean = false;
    if (user.role === Role.Student){
      projectAddDto.listStudent.push(userProfile.id);
      isStudent = true;
    }
    else if (user.role === Role.Teacher)
      projectAddDto.listTeacher.push(userProfile.id);
    const result = await this.projectService.createProject(projectAddDto, isStudent, userProfile.lab.id);
    return result;
  }

  @Get('getprojectinlab/:id')
  async GetProjectInLab(labId: string) {
    const res = await this.projectService.GetProjectInLab(labId);
    return res;
  }

  @ApiBody({type: CloseProjectDto})
  @Post("closeproject")
  async CloseProject(@Body() closeProject: CloseProjectDto){
    const res = await this.projectService.CloseProject(closeProject);
    return res;
  }

  @ApiBody({type: CancelProjectDto})
  @Post("cancelproject")
  async CancelProject(@Body() projectCancel: CancelProjectDto){
    const res = await this.projectService.CancelProject(projectCancel);
    return res;
  }

  @Get("getmyproject")
  async GetMyProject(@Req() req) {
    const user = req.user;
    const userProfile = await this.userService.getProfileUser(user.userId, user.role);
    const res = await this.projectService.ProjectOfUser(userProfile.id, userProfile.lab.id ,user.role)
    return res;
  }
}
