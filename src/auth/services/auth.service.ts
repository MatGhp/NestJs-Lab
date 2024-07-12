import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signup(authCred: AuthCredentialsDto): Promise<void> {
    await this.userRepository.createUser(authCred);
  }
}
