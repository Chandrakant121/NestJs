import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "./jwt.interface";
import { User } from "./user.entity";
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UsersRepository)
    private usersRepository: UsersRepository) {
        super({
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