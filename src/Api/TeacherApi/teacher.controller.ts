import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TeacherService } from "./teacher.service";

@ApiTags("Teacher")
@Controller("teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

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