import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/Api/UserApi/users.module";
import { StudentModule } from "src/Api/StudentApi/student.module";
import { TeacherModule } from "src/Api/TeacherApi/teacher.module";
import { JwtStrategy } from "./Strategy/jwt.strategy";
import { AuthController } from "./auth.controller";

@Module({
    imports : [UsersModule, 
        StudentModule,
        TeacherModule,
        JwtModule.register({

        }),
    ],
    controllers : [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}