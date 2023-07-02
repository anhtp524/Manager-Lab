import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LabboratoryService } from "./laboratory.service";

@ApiTags("Lab")
@Controller("lab")
export class LaboratoryController {
  constructor(private readonly userService: LabboratoryService) {}

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