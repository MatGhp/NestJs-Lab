import { Module } from '@nestjs/common';
import { FileResolver } from './file.resolver';
import { FileService } from './services/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileResolver, FileService],
})
export class AzureFileManagementModule {}
