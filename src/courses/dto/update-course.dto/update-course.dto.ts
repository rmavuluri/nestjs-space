//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';

import { CreateCourseDto } from '../create-course.dto/create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
