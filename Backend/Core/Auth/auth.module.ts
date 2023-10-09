import { Module } from "@nestjs/common";
import { UsersService } from "src/Api/UserApi/users.service";
import { AuthService } from "./auth.service";

@Module({
    imports : [UsersService],
    controllers : [],
    providers: [AuthService]
})
export class AuthModule {}