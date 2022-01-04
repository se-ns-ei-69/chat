import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './users.entity';
import { UserI } from './users.interface';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>) { }

    async create(userDto: CreateUserDto) {
        return await this.usersRepository.save(userDto);
    }

    getOne(id: number): Promise<UserI> {
        return this.usersRepository
            .createQueryBuilder('users')
            .where({ id: id })
            .select(['users.nickName',
                'users.banned',
                'users.mutted',
                'users.role',
                'users.id'])
            .getOne()
    }

    async updateAndSave(id: number, action) {
        const user = await this.usersRepository.findOne({ where: { id } });
        user[action] = !user[action];

        return await this.usersRepository.save(user);
    }

    getAllUsers(): Promise<UserI[]> {
        return this.usersRepository
            .createQueryBuilder('users')
            .select(['users.nickName',
                'users.mutted',
                'users.banned',
                'users.id'])
            .getMany()
    }

    getUserByNick(nickName: string) {
        return this.usersRepository.
            createQueryBuilder('user')
            .select('user')
            .addSelect('user.password')
            .where('user.nickName = :nickName', { nickName })
            .getOne()
    }
}
