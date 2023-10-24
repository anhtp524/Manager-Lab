import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Payload } from "Core/CoreModel/Payload.model";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "access_key"
        })
    }
    
    async validate(payload : any) {
        var payloadReq: Payload = {
            userId: payload.sub.userId,
            role : payload.sub.role
        }
        return payloadReq;
    }
}