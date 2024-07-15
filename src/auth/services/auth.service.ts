import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signup(authCred: AuthCredentialsDto): Promise<void> {
    await this.userRepository.createUser(authCred);
  }

  async signIn(auth: AuthCredentialsDto): Promise<string> {
    const { username, password } = auth;

    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (user && (await compare(password, user.password))) {
      return 'success';
    }
    throw new UnauthorizedException(
      'Authentication failed, please check your username or password!',
    );
  }
}
