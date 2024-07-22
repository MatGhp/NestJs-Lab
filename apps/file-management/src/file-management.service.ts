import { Injectable } from '@nestjs/common';
import { CreateFileManagementDto } from './dto/create-file-management.dto';
import { UpdateFileManagementDto } from './dto/update-file-management.dto';
import { FileRepository } from './file.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileManagementService {
  constructor(private readonly fileRepository: FileRepository) {}

  create(createFileManagementDto: CreateFileManagementDto) {
    return this.fileRepository.create({
      id: uuidv4(),
      ...createFileManagementDto,
      timestamp: new Date(),
      saveDateTime: new Date(),
    });
  }

  findAll() {
    return this.fileRepository.find({});
  }

  findOne(_id: number) {
    return this.fileRepository.find({ _id });
  }

  update(_id: number, updateFileManagementDto: UpdateFileManagementDto) {
    return this.fileRepository.findOneAndUpdate(
      { _id },
      { $set: updateFileManagementDto },
    );
  }

  remove(_id: number) {
    return this.fileRepository.findOneAndDelete({ _id });
  }
}
