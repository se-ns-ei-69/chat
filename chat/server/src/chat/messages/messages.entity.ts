import { User } from '../../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Timestamp } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({default: false})
  edited: boolean;

  @Column()
  imageUrl: string;

  @ManyToOne(() => User, (user: User) => user.messages)
  user: User;

  @CreateDateColumn()
  created_at: Date;

}