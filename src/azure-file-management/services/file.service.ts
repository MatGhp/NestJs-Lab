import { Injectable } from '@nestjs/common';
import { FileEntity } from '../file.entity';
import { FileRepository } from './file.repository';
import { CreateFileInput } from '../file.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async getAllFile(): Promise<FileEntity[]> {
    return this.fileRepository.find();
  }

  async getFile(name: string): Promise<FileEntity[]> {
    return this.fileRepository.findByName(name);
  }

  async createFile(createFile: CreateFileInput): Promise<FileEntity> {
    const { name, uri, saveDateTime } = createFile;
    const newFile = this.fileRepository.create({
      name,
      saveDateTime,
      uri,
      id: uuidv4(),
    });
    return this.fileRepository.save(newFile);
  }
}
