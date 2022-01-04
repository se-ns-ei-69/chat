import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { UnauthorizedException } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from './messages/messages.service';
import { ConnectedUserService } from './connectedUsers/connectedUsers.service';
import { MessageI } from './messages/messages.interface';
import { UserI } from 'src/users/users.interface';
import { AuthService } from 'src/auth/auth.service';
import { ADMIN, ALL_MESSAGES, ALL_USERS_LIST, BAN, BANNED, ERROR, MESSAGE, MUT, MUTTED, NEW_MESSAGE, ONLINE_USERS, USER_DATA } from 'src/constants/constants';

@WebSocketGateway({ cors: true, maxHttpBufferSize: 3e8 })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  constructor(
    private usersService: UsersService,
    private messagesService: MessagesService,
    private authService: AuthService,
    private connectedUserService: ConnectedUserService
  ) { }

  afterInit() {
    this.connectedUserService.deleteAll();
  }

  async handleConnection(client: Socket, ...args: any[]) {

    try {
      const decodedToken = await this.authService.verifyJwt(client.handshake.query.token);
      const user: UserI = await this.usersService.getOne(decodedToken.id);

      if (!user) {
        return this.disconnect(client);
      }

      client.data.user = user;
      // if (user.role === ADMIN) {
        const users = await this.usersService.getAllUsers();
        this.server.emit(ALL_USERS_LIST, users);
      // }

      await this.connectedUserService.create({ socketId: client.id, user });

      const onlineUsers = await this.connectedUserService.getAllOnlineUsers();
      const arr = [...new Set(onlineUsers.map(el => el.user.nickName))];
      this.server.emit(ONLINE_USERS, arr);

      client.emit(USER_DATA, user)

      const messages = await this.messagesService.findMessages();
      this.server.to(client.id).emit(ALL_MESSAGES, messages.reverse());

      const lastMessages = await this.messagesService.findMessagesUniq();
      client.emit('lastMessages', lastMessages)
    } catch (e) {
      console.log(e.message);
      return this.disconnect(client)
    }

  }

  @SubscribeMessage(MESSAGE)
  async handleMessage(client: Socket, message: MessageI) {
    const messageAuthor = await this.usersService.getOne(client.data.user.id);
    
    if (messageAuthor.mutted || message.content.length > 200) {
      return
    }

    if(!message.content.length && !message.isFile) {
      return
    }
    
    const lastMessage = await this.messagesService.findLastMessage(client.data.user.id);
    const lastMessageTime = new Date(lastMessage?.created_at).getTime()

    if (!lastMessage || (Date.now() - lastMessageTime > 15000)) {
      const createdMessage = await this.messagesService.create(
        {
          ...message,
          user: {
            id: client.data.user.id,
            nickName: client.data.user.nickName
          }
        });
      this.server.emit(NEW_MESSAGE, createdMessage);

      const lastMessages = await this.messagesService.findMessagesUniq();
      client.broadcast.emit('lastMessages', lastMessages)
    }
  }

  @SubscribeMessage('editMessage')
  async handleEditMessage(client: Socket, editedMessage: MessageI) {
    if(client.data.user.id === editedMessage.user.id) {
      await this.messagesService.findAndUpdateById(editedMessage)

      const messages = await this.messagesService.findMessages();
      this.server.emit(ALL_MESSAGES, messages.reverse());

    }
  }

  // @SubscribeMessage('deleteMessage')
  // async handleDeleteMessage(client: Socket, message: MessageI) {
  // }

  // @SubscribeMessage('replyMessage')
  // async handleReplyMessage(client: Socket, message: MessageI) {
  // }


  async adminAction(client: Socket, target: number, action: string) {
    const updatedUser = await this.usersService.updateAndSave(target, action);
    
    const sockets = await this.connectedUserService.getMany(target);

    if (sockets.length) {
      const activeSockets = await this.server
        .in(sockets.map(item => item.socketId))
        .fetchSockets();

      activeSockets.forEach(executedSocket => {

        if (executedSocket.data.user.role === ADMIN) {
          return
        }

        action === BANNED
          ?
          executedSocket.disconnect(true)
          :
          executedSocket.emit(USER_DATA, updatedUser)
      });
    }
    const users = await this.usersService.getAllUsers();
    this.server.to(client.id).emit(ALL_USERS_LIST, users);
  }

  @SubscribeMessage(BAN)
  async handleBan(client: Socket, data) {
    if (client.data.user.role === ADMIN) {
      this.adminAction(client, data.id, BANNED);
    }
  }

  @SubscribeMessage(MUT)
  async handleMut(client: Socket, data) {
    if (client.data.user.role === ADMIN) {
      this.adminAction(client, data.id, MUTTED);
    }
  }

  async handleDisconnect(client: Socket) {
    await this.connectedUserService.deleteBySocketId(client.id);
    const onlineUsers = await this.connectedUserService.getAllOnlineUsers();
    const arr = [...new Set(onlineUsers.map(el => el.user.nickName))];
    this.server.emit(ONLINE_USERS, arr);
    client.disconnect();
  }

  private disconnect(client: Socket) {
    client.emit(ERROR, new UnauthorizedException());
    client.disconnect();
  }
}