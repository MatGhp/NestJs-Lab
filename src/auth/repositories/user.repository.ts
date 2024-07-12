import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (exception) {
      if (exception.code == '23505') {
        throw new ConflictException('Username already exists!');
      }
      throw new InternalServerErrorException();
    }
  }
}
