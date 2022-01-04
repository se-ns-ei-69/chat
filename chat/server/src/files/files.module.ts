import { Module } from '@nestjs/common'
import { FilesService } from './file.upload.service'

@Module({
    providers: [FilesService],
    exports: [FilesService]
})
export class FilesModule {}