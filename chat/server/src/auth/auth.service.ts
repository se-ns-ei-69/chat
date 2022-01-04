import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';


const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) { }

    async registration(userDto: CreateUserDto) {

        const candidate = await this.usersService.getUserByNick(userDto.nickName);

        if (candidate) {
            const chek = await this.comparePasswords(userDto.password, candidate.password);

            if (!chek || candidate.banned) {
                throw new HttpException(['Login was not successfull'], HttpStatus.UNAUTHORIZED);
            }

            return this.generateJwt(candidate);
        }

        const passwordHash: string = await this.hashPassword(userDto.password);

        const users = await this.usersService.getAllUsers();
        const currentRole = users.length ? "USER" : "ADMIN";

        const user = await this.usersService.create({ ...userDto, password: passwordHash, role: currentRole });

        return this.generateJwt(user);
    }

    async generateJwt(user: User): Promise<any> {
        const payload = {
            nickName: user.nickName,
            id: user.id,
            role: user.role,
            banned: user.banned,
            mutted: user.mutted
        }
        return {
            token: this.jwtService.sign(payload),
            user: payload
        };
    }

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 7);
    }

    comparePasswords(password: string, storedPasswordHash: string): Promise<any> {
        return bcrypt.compare(password, storedPasswordHash);
    }


    verifyJwt(jwt): Promise<any> {
        return this.jwtService.verifyAsync(jwt);
    }

}
