import { Module } from '@nestjs/common';
import { FileResolver } from './file.resolver';
import { FileService } from './services/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { FileRepository } from './services/file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, FileRepository])],
  providers: [FileResolver, FileService, FileRepository],
})
export class AzureFileManagementModule {}
