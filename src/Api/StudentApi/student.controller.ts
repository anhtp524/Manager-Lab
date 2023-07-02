import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StudentService } from "./student.service";

@ApiTags("Student")
@Controller("student")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

//   @ApiBody({type: CreateUser})
//   @Post("adduser")
//   CreateUsers(@Body() newUser: CreateUser) {
//     return this.userService.add(newUser);
//   }

//   @Get("getall")
//   GetAllUser(){
//     return this.userService.findAll();
//   }
}