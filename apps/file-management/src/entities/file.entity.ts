import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';

@Schema({ versionKey: false })
export class FileDocument extends AbstractDocument {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  uri: string;

  @Prop()
  timestamp: Date;

  @Prop()
  saveDateTime: Date;
}

export const FileSchema = SchemaFactory.createForClass(FileDocument);
