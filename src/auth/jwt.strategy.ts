import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "./jwt.interface";
import { User } from "./user.entity";
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UsersRepository)
    private configService: ConfigService,
        private usersRepository: UsersRepository) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            seCreteOrKey: 'topSecrete51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload
        const user: User = await this.usersRepository.findOne({ username })
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}