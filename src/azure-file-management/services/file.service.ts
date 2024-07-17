import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../file.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  createFile(
    name: string,
    uri: string,
    saveDateTime: string,
  ): Promise<FileEntity> {
    const file = this.fileRepository.create({
      id: uuid.toString(),
      name,
      uri,
      saveDateTime,
    });

    return this.fileRepository.save(file);
  }
}
