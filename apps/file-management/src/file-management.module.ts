import { Module } from '@nestjs/common';
import { FileManagementService } from './file-management.service';
import { FileManagementController } from './file-management.controller';
import { DatabaseModule } from '@app/common';
import { FileRepository } from './file.repository';
import { FileDocument, FileSchema } from './entities/file.entity';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: FileDocument.name, schema: FileSchema },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
  controllers: [FileManagementController],
  providers: [FileManagementService, FileRepository],
})
export class FileManagementModule {}
