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

  @ApiBody({ type: RegisterStudentToProjectDto })
  @Post('registerstudenttoproject')
  async RegisterStudentToProject(
    @Body() registerStudentDto: RegisterStudentToProjectDto,
    @Req() req,
  ) {
    const result = await this.projectService.registerStudentIntoProject(
      registerStudentDto.projectId,
      req.user.userId,
    );
    return result;
  }

  @ApiBody({ type: AprrovalStudentToProjectDto })
  @Post('approvestudenttoproject')
  async ApproveStudentToProject(
    @Body() approvalStudentDto: AprrovalStudentToProjectDto,
  ) {
    const result = await this.projectService.approveToProjectByTeacher(
      approvalStudentDto.projectId,
      approvalStudentDto.studentId,
      '',
    );
    return result;
  }

  @ApiBody({ type: ProjectAddDto })
  @Post('createproject')
  async CreateProject(@Body() projectAddDto: ProjectAddDto, @Req() req) {
    const user = req.user;
    const userProfile = await this.userService.getProfileUser(user.userId, user.role)
    if (user.role === Role.Student)
      projectAddDto.listStudent.push(userProfile.id);
    else if (user.role === Role.Teacher)
      projectAddDto.listTeacher.push(userProfile.id);
    const result = await this.projectService.createProject(projectAddDto);
    return result;
  }

  @Get('getprojectinlab/:id')
  async GetProjectInLab(labId: string) {
    const res = await this.projectService.GetProjectInLab(labId);
    return res;
  }
}
