import { Message } from '../chat/messages/messages.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ConnectedUsers } from '../chat/connectedUsers/connected.users.entity';
import { USER } from 'src/constants/constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @Column({select: false})
  password: string;

  @Column({ default: USER })
  role: string;

  @Column({ default: false })
  mutted: boolean;

  @Column({ default: false })
  banned: boolean;

  @OneToMany(() => Message, (message: Message) => message.user)
  messages: Message[];

  @OneToMany(() => ConnectedUsers, (connected_user: ConnectedUsers) => connected_user.user)
  connected_users: ConnectedUsers[];

}