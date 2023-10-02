import { Injectable } from '@nestjs/common';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class CourseRatingService {
  constructor(private readonly coursesService: CoursesService) {}
}
