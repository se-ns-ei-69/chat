import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'Required field' })
    @MinLength(3, { message: 'Minimal length - 3 characters' })
    @Matches(/^[a-zA-Z0-9]+$/, { message: 'No special characters' })
    readonly nickName: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    readonly role: string;

    readonly mutted: boolean;

    readonly banned: boolean;
}