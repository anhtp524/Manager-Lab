import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { StudentService } from "./student.service";
import { CreateStudentDto, RegisterToLabDto, UpdateStudentDto } from "./Dto/student.dto";

@ApiTags("Student")
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
  async RegisterToLab(@Body() registerLab: RegisterToLabDto){
    const result = await this.studentService.registerForLab(registerLab.studentId, registerLab.labId);
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
  async GetStuentInLab(@Param('labId')labId: string) {
    var res = await this.studentService.getStudentInLab(labId);
    return res;
  }

}