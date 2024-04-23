import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    CourseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'developmentcomputer' ? './envs/developmentcomputer.env' : './envs/developmentbook.env',
      ignoreEnvFile: false,
      validate: (config) => {
        if (!config.DB_HOST || !config.DB_PORT) {
          throw new Error("Critical database configuration is missing");
        }
        return config;
      }
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class AppModule {}
