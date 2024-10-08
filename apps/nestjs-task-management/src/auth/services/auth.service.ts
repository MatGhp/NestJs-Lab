import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(authCred: AuthCredentialsDto): Promise<void> {
    await this.userRepository.createUser(authCred);
  }

  async signIn(auth: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = auth;

    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (user && (await compare(password, user.password))) {
      const payload = { username };

      const expires = new Date();
      expires.setSeconds(
        expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
      );

      const accessToken = await this.jwtService.signAsync(payload, {});
      return { accessToken };
    }
    throw new UnauthorizedException(
      'Authentication failed, please check your username or password!',
    );
  }
}
