import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtDecrypTool, SecretTool } from '../utils/InternalTools';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Module({
  imports: [JwtModule.register(jwtConfig), TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, SecretTool, JwtDecrypTool],
})
export class UserModule {}
