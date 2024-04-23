import { JwtModuleOptions } from '@nestjs/jwt';
// config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {
    // 示例配置检查
console.log({
  host: this.configService.get<string>('DB_HOST'),
  port: this.configService.get<number>('DB_PORT'),
  username: this.configService.get<string>('DB_USERNAME'),
  password: this.configService.get<string>('DB_PASSWORD'),
  database: this.configService.get<string>('DB_NAME'),
}); 
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: this.configService.get<string>('DB_HOST'),
      port: parseInt(this.configService.get<string>('DB_PORT')),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };
  }
}

// config.ts
export const jwtConfig: JwtModuleOptions = {
  secret: 'xdclass.net',
  signOptions: { expiresIn: '7d' },
  global: true,
};
