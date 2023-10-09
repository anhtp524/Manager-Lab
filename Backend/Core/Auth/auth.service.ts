import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/Api/UserApi/users.service";
import { LoginDto } from "./Dto/auth.dto";
import * as bcrypt from "bcrypt"
import { UserEntity } from "src/entity/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ){}

    async login(userLogin: LoginDto) {
        const userModel = await this.userService.findUserByEmail(userLogin.email);
        if (!userModel) throw new UnauthorizedException("User does not exist");
        const checkPassword = await bcrypt.compare(userLogin.password, userModel.password);

    }

    async signToken(user: UserEntity, key: string, time: string){
        const payload = {sub : {memberId : user.memberId, role : user.role}};
        const token = await this.jwtService.sign(payload, {secret: key, expiresIn: time});
        return token;
    }
}