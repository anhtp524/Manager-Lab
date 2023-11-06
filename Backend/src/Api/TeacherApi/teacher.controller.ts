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
import { TeacherService } from './teacher.service';
import {
  AddTeacherLabDto,
  CreateTeacherDto,
  SearchNameDto,
} from './Dto/teacher.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../UserApi/users.service';
import { DeleteTeacherDto } from './Dto/deleteTeacher.dto';

@ApiTags('Teacher')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly userService: UsersService,
  ) {}

  @Get('getall')
  GetAllTeacher() {
    return this.teacherService.findAll();
  }

  // @Get("/:id")
  // GetTeacherById(@Param('id') id: string){
  //   return this.teacherService.findTeacherById(id)
  // }

  @ApiBody({ type: CreateTeacherDto })
  @Post('createteacher')
  CreateStudent(@Body() newStudent: CreateTeacherDto) {
    return this.teacherService.add(newStudent);
  }

  @ApiBody({ type: SearchNameDto })
  @Post('getteacherinlabbyname')
  async GetTeacherInLabByName(
    @Body() searchNameDto: SearchNameDto,
    @Req() req,
  ) {
    const user = req.user;
    const userProfile = await this.userService.getProfileUser(
      user.userId,
      user.role,
    );
    var res = await this.teacherService.getListTeacherByNameInLab(
      searchNameDto.searchName,
      userProfile.lab.id,
    );
    return res;
  }

  @ApiBody({ type: AddTeacherLabDto })
  @Post('addteachertolab')
  async AddTeacherToLab(@Body() addTeacherDto: AddTeacherLabDto) {
    var res = await this.teacherService.addTeacherToLab(
      addTeacherDto.teacherId,
      addTeacherDto.labId,
    );
    return res;
  }

  @ApiBody({ type: DeleteTeacherDto })
  @Post('deleteteacherinlab')
  async DeleteTeacherInLab(@Body() deleteTeacher: DeleteTeacherDto) {
    var res = await this.teacherService.deleteTeacherFromLab(
      deleteTeacher.teacherId,
    );
    return res;
  }

  @Get('getteacherinlab/:labId')
  async GetTeacherInLab(@Param('labId') labId: string) {
    var res = await this.teacherService.getTeacherInLab(labId);
    return res;
  }

  @Get('getteachernolab')
  async GetTeacherNoLab() {
    const res = await this.teacherService.getListTeacherNoLab();
    return res;
  }
}
