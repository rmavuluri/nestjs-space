import { Module } from '@nestjs/common';
import { CourseRatingService } from './course-rating.service';
import { CoursesModule } from 'src/courses/courses.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
    }),
    CoursesModule,
  ],
  providers: [CourseRatingService],
})
export class CourseRatingModule {}
