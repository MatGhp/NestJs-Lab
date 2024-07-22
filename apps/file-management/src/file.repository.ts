import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { FileDocument } from './entities/file.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FileRepository extends AbstractRepository<FileDocument> {
  protected readonly logger = new Logger(FileRepository.name);

  constructor(
    @InjectModel(FileDocument.name) fileDocumentModel: Model<FileDocument>,
  ) {
    super(fileDocumentModel);
  }

  // async findByName(name: string): Promise<FileDocument[]> {
  //   return this.find({
  //     where: {
  //       name: { $regex: new RegExp(name, 'i') } as any,
  //     },
  //   });
  // }
}
