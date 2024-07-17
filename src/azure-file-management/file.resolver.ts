import { Resolver, Query } from '@nestjs/graphql';
import { FileType } from './file.type';

@Resolver((of) => FileType)
export class FileResolver {
  @Query((returns) => FileType)
  file() {
    return {
      id: 'some-random-id',
      name: 'some-file-name',
      uri: '/test-url',
      saveDateTime: new Date().toISOString(),
    };
  }
}
