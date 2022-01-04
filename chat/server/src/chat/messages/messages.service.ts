import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './messages.entity';
import { MessageI } from './messages.interface';
import { FilesService } from 'src/files/file.upload.service';

@Injectable()
export class MessagesService {

    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
        private filesService: FilesService) { }

    async create(message: MessageI) {
        if(message.isFile) {
            const fileName = await this.filesService.createFile(message.file, message.fileName)
            return this.messagesRepository.save(this.messagesRepository.create({...message, imageUrl: `http://localhost:5000/${fileName}`}))
        }
        return this.messagesRepository.save(this.messagesRepository.create({...message, imageUrl: ''}))
    }

    findMessages() {
        return this.messagesRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.user', 'user')
            .select(['message.content', 'message.created_at', 'message.imageUrl','message.edited','message.id', 'user.id', 'user.nickName'])
            .orderBy('message.created_at', 'DESC')
            .limit(20)
            .getMany()
    }

    findMessagesUniq() {
        return this.messagesRepository
            .createQueryBuilder("message")
            .leftJoin('message.user', 'user')
            .select(['user.nickName', 'user.id'])
            .addSelect('(SELECT message.content FROM message WHERE message.userId = user.id ORDER BY message.created_at DESC LIMIT 1) AS lastMessage')
            .addSelect('(SELECT message.created_at FROM message WHERE message.userId = user.id ORDER BY message.created_at DESC LIMIT 1) AS createdAt')
            .distinct(true)
            .getRawMany()
    }

    async findAndUpdateById({id, content}) {
        const editedMessage = await this.messagesRepository.findOne({ where: {id} })
        editedMessage.content = content
        editedMessage.edited = true
        return await this.messagesRepository.save(editedMessage);
    }

    findLastMessage(id) {
        return this.messagesRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.user', 'user')
            .where('user.id = :id', { id: id })
            .orderBy('message.created_at', 'DESC')
            .getOne()
    }

}