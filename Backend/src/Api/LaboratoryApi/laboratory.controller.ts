import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LabboratoryService } from "./laboratory.service";
import { CreateLaboratoryDto } from "./Dto/laboratory.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Lab")
@UseGuards(AuthGuard('jwt'))
@Controller("lab")
export class LaboratoryController {
  constructor(private readonly labService: LabboratoryService) {}

  @ApiBody({type: CreateLaboratoryDto})
  @Post("createLab")
  CreateLab(@Body() newUser: CreateLaboratoryDto) {
    return this.labService.add(newUser);
  }

  @Get("getall")
  GetAllLab(){
    return this.labService.findAll();
  }

  @Get("/:id")
  GetLabById(@Param('id') id: string){
    return this.labService.findOne(id);
  }
}