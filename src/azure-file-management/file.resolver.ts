import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FileType } from './file.type';
import { FileService } from './services/file.service';

@Resolver((of) => FileType)
export class FileResolver {
  constructor(private fileService: FileService) {}
  @Query((returns) => FileType)
  file() {
    return {
      id: 'some-random-id',
      name: 'some-file-name',
      uri: '/test-url',
      saveDateTime: new Date().toISOString(),
    };
  }

  @Mutation((returns) => FileType)
  createFile(
    @Args('name') name: string,
    @Args('saveDateTime') saveDateTime: string,
    @Args('uri') uri: string,
  ) {
    return this.fileService.createFile(name, saveDateTime, uri);
  }
}
