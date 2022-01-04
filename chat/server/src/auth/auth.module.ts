import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    // ConfigModule.forRoot({
    //   envFilePath: `.${process.env.NODE_ENV}.env`
    // }),
    JwtModule.register({
      secret: "super-secret-key",
      signOptions: {
        expiresIn: '24h'
      }
    }),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }

