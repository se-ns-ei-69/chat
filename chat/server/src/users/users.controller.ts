import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LOGIN, USERS } from 'src/constants/constants';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller(USERS)
export class UsersController {

    constructor(
        private authServices: AuthService
    ) { }

    @UsePipes(ValidationPipe)
    @Post(LOGIN)
    create(@Body() userDto: CreateUserDto) {
        return this.authServices.registration(userDto);
    }
}
