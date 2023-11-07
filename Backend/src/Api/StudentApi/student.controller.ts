import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import {
  CreateStudentDto,
  RegisterToLabDto,
  UpdateStudentDto,
} from './Dto/student.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../UserApi/users.service';
import { ApproveStudentDto } from './Dto/approveStudent.dto';
import { DeleteStudentDto } from './Dto/deleteStudent.dto';
import { SearchNameDto } from '../TeacherApi/Dto/teacher.dto';

@ApiTags('Student')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly userService: UsersService,
  ) {}

  @Get('getall')
  GetAllProject() {
    return this.studentService.findAll();
  }

  @Get('getstudentbyid/:id')
  GetProjectById(@Param('id') id: string) {
    return this.studentService.findStudentById(id);
  }

  @ApiBody({ type: CreateStudentDto })
  @Post('createstudent')
  CreateStudent(@Body() newStudent: CreateStudentDto) {
    return this.studentService.add(newStudent);
  }

  @ApiBody({ type: UpdateStudentDto })
  @Post('updatestudent')
  async UpdateStudent(@Body() updateStudent: UpdateStudentDto) {
    var res = await this.studentService.updateStudent(
      updateStudent.id,
      updateStudent,
    );
    return res;
  }

  @Get('getstudentbycode')
  async GetStudentByStudentCode(@Query('studentCode') studentCode: number) {
    var result = this.studentService.findStudentByStudentCode(studentCode);
    return result;
  }

  @ApiBody({ type: RegisterToLabDto })
  @Post('registertolab')
  async RegisterToLab(@Body() registerLab: RegisterToLabDto, @Req() req) {
    const userProfile = await this.userService.getProfileUser(
      req.user.userId,
      req.user.role,
    );
    const result = await this.studentService.registerForLab(
      userProfile.id,
      registerLab.labId,
      true,
    );
    return result;
  }

  @ApiBody({ type: RegisterToLabDto })
  @Post('withdrawfromlab')
  async WithDrawFromLab(@Body() registerLab: RegisterToLabDto, @Req() req) {
    const userProfile = await this.userService.getProfileUser(
      req.user.userId,
      req.user.role,
    );
    const result = await this.studentService.registerForLab(
      userProfile.id,
      registerLab.labId,
      false,
    );
    return result;
  }

  @ApiBody({ type: ApproveStudentDto })
  @Post('approvetolab')
  async ApproveStundentToLab(@Body() approveStudent: ApproveStudentDto) {
    const result = await this.studentService.approveStudentToLab(
      approveStudent.studentId,
    );
    return result;
  }

  @ApiBody({ type: DeleteStudentDto })
  @Post('deletestudentinlab')
  async DeleteStudentFromLab(@Body() deleteDto: DeleteStudentDto) {
    const result = await this.studentService.deleteOrRejectStudentFromLab(
      deleteDto.studentId,
    );
    return result;
  }

  @Get('getstudentinlab/:labId')
  async GetStudentInLab(@Param('labId') labId: string) {
    var res = await this.studentService.getStudentInLab(labId, true);
    return res;
  }

  @Get('getstudentregisterinlab/:labId')
  async GetStudentRegisterInLab(@Param('labId') labId: string) {
    var res = await this.studentService.getStudentInLab(labId, false);
    return res;
  }

  @ApiBody({ type: SearchNameDto })
  @Post('getstudentbyname')
  async GetStudentByName(@Body() searcherNameDto: SearchNameDto, @Req() req) {
    const user = req.user;
    const userProfile = await this.userService.getProfileUser(
      user.userId,
      user.role,
    );
    const res = await this.studentService.GetListStudentByName(
      searcherNameDto.searchName,
      userProfile.lab.id,
      userProfile.id,
    );
    return res;
  }
}
