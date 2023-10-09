import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./Dto/auth.dto";

@ApiTags("Authentication")
@Controller("authentication")
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @ApiBody({type: LoginDto})
    @Post("login")
    async Login(@Body() loginDto: LoginDto ) {
        const result = await this.authService.login(loginDto);
    } 
}