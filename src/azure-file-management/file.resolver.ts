import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FileType } from './file.type';
import { FileService } from './services/file.service';

@Resolver(() => FileType)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Query(() => [FileType])
  async file(@Args('name') name: string): Promise<FileType[]> {
    const files = await this.fileService.getFile(name);
    if (!files || files.length === 0) {
      throw new Error(`No files found with name containing "${name}"`);
    }
    return files;
  }

  @Mutation(() => FileType)
  async createFile(
    @Args('name') name: string,
    @Args('saveDateTime') saveDateTime: string,
    @Args('uri') uri: string,
  ): Promise<FileType> {
    return this.fileService.createFile(name, saveDateTime, uri);
  }
}
