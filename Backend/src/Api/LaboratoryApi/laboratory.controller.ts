import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { LabboratoryService } from "./laboratory.service";
import { CreateLaboratoryDto } from "./Dto/laboratory.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Lab")
@ApiBearerAuth()
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

  @Get("getdetaillab/:id")
  async GetDetailLab(@Param("id") id: string) {
    const result = await this.labService.getDetailLab(id);
    return result;
  }
}