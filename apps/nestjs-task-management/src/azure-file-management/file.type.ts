import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('File')
export class FileType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  uri: string;

  @Field()
  saveDateTime: string;
}
