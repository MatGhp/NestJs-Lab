import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
