import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials-dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UsersRepository extends Repository<User>{

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto

        // Hashing
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({ username, password })
        try {
            await this.save(user)
        }
        catch (err) {
            // Duplicate Username
            if (err.code === '23505') {
                throw new ConflictException('Username already exists')
            }
            else {
                throw new InternalServerErrorException();
            }

            console.log(err.code)
        }

    }
}