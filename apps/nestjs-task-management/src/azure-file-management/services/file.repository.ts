import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FileEntity } from '../file.entity';

@Injectable()
export class FileRepository extends Repository<FileEntity> {
  constructor(private dataSource: DataSource) {
    super(FileEntity, dataSource.createEntityManager());
  }

  async findByName(name: string): Promise<FileEntity[]> {
    return this.find({
      where: {
        name: { $regex: new RegExp(name, 'i') } as any,
      },
    });
  }
}
