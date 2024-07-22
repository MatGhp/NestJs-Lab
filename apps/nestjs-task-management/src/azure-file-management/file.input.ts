import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, MinLength } from 'class-validator';

@InputType()
export class CreateFileInput {
  @Field()
  @MinLength(8)
  name: string;

  @Field()
  @IsDateString()
  saveDateTime: string;

  @Field()
  @MinLength(8)
  uri: string;
}
