import {
  Controller,
  Get,
  Headers,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtDecrypTool } from 'src/utils/InternalTools';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DeleteCourseDto } from './dto/delete-course.dto';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly jwtDecrypTool: JwtDecrypTool,
  ) {}

  // 课程查询接口
  @Get()
  findAll(@Headers() header) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.courseService.findAll();
  }

  // 课程创建接口
  @Post()
  create(@Body() dto: CreateCourseDto, @Headers() header) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.courseService.create(dto);
  }

  // 课程修改接口
  @Put()
  update(@Body() dto: UpdateCourseDto, @Headers() header) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.courseService.update(dto);
  }

  // 课程删除接口
  @Delete()
  delete(@Body() dto: DeleteCourseDto, @Headers() header) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.courseService.delete(dto);
  }
}
