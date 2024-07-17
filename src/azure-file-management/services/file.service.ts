import { Injectable } from '@nestjs/common';
import { FileEntity } from '../file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async getFile(name: string): Promise<FileEntity[]> {
    return this.fileRepository.findByName(name);
  }

  async createFile(
    name: string,
    saveDateTime: string,
    uri: string,
  ): Promise<FileEntity> {
    const newFile = this.fileRepository.create({ name, saveDateTime, uri });
    return this.fileRepository.save(newFile);
  }
}
