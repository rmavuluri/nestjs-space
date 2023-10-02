import { Module } from '@nestjs/common';
import { CourseRatingService } from './course-rating.service';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [CoursesModule],
  providers: [CourseRatingService],
})
export class CourseRatingModule {}
