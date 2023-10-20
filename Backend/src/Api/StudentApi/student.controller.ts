import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { StudentService } from "./student.service";
import { CreateStudentDto, RegisterToLabDto, UpdateStudentDto } from "./Dto/student.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Student")
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("student")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get("getall")
  GetAllProject(){
    return this.studentService.findAll();
  }

  @Get("getstudentbyid/:id")
  GetProjectById(@Param('id') id: string){
    return this.studentService.findStudentById(id)
  }

  @ApiBody({type: CreateStudentDto})
  @Post("createstudent")
  CreateStudent(@Body() newStudent: CreateStudentDto){
    return this.studentService.add(newStudent);
  }

  @ApiBody({type: UpdateStudentDto})
  @Post("updatestudent")
  async UpdateStudent(@Body() updateStudent: UpdateStudentDto){
    var res = await this.studentService.updateStudent(updateStudent.id, updateStudent);
    return res;
  }

  @Get("getstudentbycode")
  async GetStudentByStudentCode(@Query('studentCode') studentCode: number ){
    var result = this.studentService.findStudentByStudentCode(studentCode);
    return result;
  }

  @ApiBody({type: RegisterToLabDto})
  @Post("registertolab")
  async RegisterToLab(@Body() registerLab: RegisterToLabDto, @Req() req){
    const result = await this.studentService.registerForLab(req.user.memberId, registerLab.labId);
    return result;
  }

  //@ApiBody({type: 'string'})
  @Post("approvetolab")
  async ApproveStundentToLab(@Body() studentId: string){
    const result = await this.studentService.approveStudentToLab(studentId);
    return result;
  }

  @ApiBody({type: 'string'})
  @Post("deletestudentinlab")
  async DeleteStudentFromLab(@Body() studentId: string){
    const result = await this.studentService.deleteOrRejectStudentFromLab(studentId);
    return result;
  }

  @Get("getstudentinlab/:labId")
  async GetStudentInLab(@Param('labId')labId: string) {
    var res = await this.studentService.getStudentInLab(labId, true);
    return res;
  }

  @Get("getstudentregisterinlab/:labId")
  async GetStudentRegisterInLab(@Param('labId')labId: string) {
    var res = await this.studentService.getStudentInLab(labId, false);
    return res;
  }

}