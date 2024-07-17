import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class FileEntity {
  //_id is the internal mongodb id
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  uri: string;

  @Column()
  saveDateTime: string;
}
