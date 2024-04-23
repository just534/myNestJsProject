import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config';
import { JwtDecrypTool } from 'src/utils/InternalTools';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';

@Module({
  imports: [JwtModule.register(jwtConfig), TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService, JwtDecrypTool],
})
export class CourseModule {}
