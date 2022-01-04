
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConnectedUsers } from './connectedUsers/connected.users.entity';
import { AppGateway } from './app.gateway';
import { ConnectedUserService } from './connectedUsers/connectedUsers.service';
import { Message } from './messages/messages.entity';
import { MessagesService } from './messages/messages.service';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([
      ConnectedUsers,
      Message,
      User
    ]),
    FilesModule
  ],
  providers: [
    AppGateway,
    ConnectedUserService,
    MessagesService,
  ]
})
export class ChatModule { }