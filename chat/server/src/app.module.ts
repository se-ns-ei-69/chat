import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from "./chat/chat.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ChatModule,
    UsersModule,
    AuthModule
  ]
})
export class AppModule { }