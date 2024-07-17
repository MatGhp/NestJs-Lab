import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { configValidationSchema } from './config.schema';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AzureFileManagementModule } from './azure-file-management/azure-file-management.module';
import { FileEntity } from './azure-file-management/file.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/azure-files',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [FileEntity],
    }),
    // deactivate to connect GraphQL and set to TypeORM
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     const isProduction = configService.get('STAGE') === 'prod';
    //     return {
    //       ssl: isProduction,
    //       extra: {
    //         ssl: isProduction ? { rejectUnauthorized: false } : null,
    //       },
    //       type: 'postgres',
    //       autoLoadEntities: true,
    //       synchronize: true,
    //       host: configService.get('DB_HOST'),
    //       port: configService.get('DB_POST'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: configService.get('DB_DATABASE'),
    //     };
    //   },
    // }),
    AuthModule,
    AzureFileManagementModule,
  ],
  providers: [TaskModule, AuthModule],
})
export class AppModule {}
