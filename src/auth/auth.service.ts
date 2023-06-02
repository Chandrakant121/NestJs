import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './jwt.interface';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(UsersRepository) private readonly usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto
        const user = await this.usersRepository.findOne({ username })

        if (user && (await bcrypt.compare(password, user.bcrypt))) {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload)
            return { accessToken }
        }
        else {
            throw new UnauthorizedException("Please check your login credentials")
        }
    }
}
