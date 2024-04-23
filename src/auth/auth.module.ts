import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtUtils } from 'src/utils/JwtService';
import { PasswordService } from './password/password.service';


// auth.module.ts
@Module({
    imports: [
      JwtModule.registerAsync({
        imports: [ConfigModule], // 确保 ConfigModule 被导入
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE') },
        }),
        inject: [ConfigService],
      }),
      // 其他设置
    ],
    providers: [JwtUtils, PasswordService],
    exports: [JwtUtils]
  })
  export class AuthModule {}
  