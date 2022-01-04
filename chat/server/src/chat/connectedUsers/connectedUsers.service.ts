import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedUsers } from './connected.users.entity';
import { ConnectedUserI } from './connected.users.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectedUserService {

  constructor(
    @InjectRepository(ConnectedUsers)
    private readonly connectedUserRepository: Repository<ConnectedUsers>
  ) { }

  create(connectedUser: ConnectedUserI): Promise<ConnectedUserI> {
    return this.connectedUserRepository.save(connectedUser);
  }

  getAllOnlineUsers(): Promise<ConnectedUserI[]> {
    return this.connectedUserRepository
      .createQueryBuilder('connected_users')
      .leftJoinAndSelect('connected_users.user', 'user')
      .select(
        [
          'connected_users.socketId',
          'user',
          'connected_users.id'
        ]
      )
      .getMany()
  }

  getOne(id): Promise<ConnectedUserI> {
    return this.connectedUserRepository
    .createQueryBuilder('connected_users')
    .leftJoinAndSelect('connected_users.user', 'user')
    .where('user.id = :id', {id})
    .getOne()
  }

  getMany(id): Promise<ConnectedUserI[]> {
    return this.connectedUserRepository
    .createQueryBuilder('connected_users')
    .leftJoinAndSelect('connected_users.user', 'user')
    .where('user.id = :id', {id})
    .getMany()
  }

  deleteBySocketId(socketId: string) {
    return this.connectedUserRepository.delete({ socketId });
  }

  deleteAll() {
    this.connectedUserRepository
      .createQueryBuilder()
      .delete()
      .execute();
  }

}