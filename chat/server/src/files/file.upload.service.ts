import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as path from 'path'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {

    async createFile(file, name): Promise<string> {
        try {
            const ext = path.parse(name).ext;
            const fileName = `${uuidv4()}${ext}`;
            const filePath = path.resolve(__dirname, '..', 'static');
      
            if(!fs.existsSync(filePath)) {
              fs.mkdirSync(filePath, {recursive: true});
            }
      
            fs.writeFileSync(path.join(filePath, fileName), file);
            return fileName;
        } catch (error) {
            throw new HttpException('Error writing to file', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

    